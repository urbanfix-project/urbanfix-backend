import prisma from '../../config/prisma.js';

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profession: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }

  return user;
};

export const updateUserProfile = async (userId, data) => {
  // Verificamos primero si el usuario existe
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }

  // Si es CLIENTE, no debería asignarse una profesión de técnico
  if (existingUser.role === 'CLIENTE' && data.profession) {
    throw { status: 400, message: 'Un usuario con rol CLIENTE no puede tener una profesión asignada' };
  }

  // Actualizamos y devolvemos solo los campos seguros
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.profession !== undefined && { profession: data.profession }),
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profession: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};