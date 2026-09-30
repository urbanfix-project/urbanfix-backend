import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma.js';

export const registerUser = async (data) => {
  const { name, email, password, role, profession } = data;

  // Verificar duplicados en la BDD
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
      throw { status: 409, message: 'El correo electrónico ya está registrado' };
  }

  // Hasheo seguro
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Interacción con la base de datos
  const newUser = await prisma.user.create({
      data: {
      name,
      email,
      password: hashedPassword,
      role: role || 'CLIENTE',
      profession: profession || null,
      },
  });

  // Generación del token
  const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
  );

  // Retornamos el objeto limpio sin la contraseña
  const { password: _, ...userWithoutPassword } = newUser;
  return { token, user: userWithoutPassword };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
      throw { status: 401, message: 'Credenciales inválidas' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      throw { status: 401, message: 'Credenciales inválidas' };
  }

  const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};