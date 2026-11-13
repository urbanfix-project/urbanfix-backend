import prisma from '../../config/prisma.js';

// Listar todos los usuarios
export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profession: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

// Listar solicitudes con filtro opcional
export const getAllServiceRequests = async (status) => {
  return prisma.serviceRequest.findMany({
    where: status ? { status } : {},
    include: {
      client: {
        select: { name: true, email: true }
      },
      technician: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

// Modificar estado de una solicitud
export const updateServiceRequestStatus = async (id, status) => {
  return prisma.serviceRequest.update({
    where: { id },
    data: { status }
  });
};
