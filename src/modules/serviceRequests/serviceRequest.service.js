
import prisma from '../../config/prisma.js';

// Crear una solicitud de servicio
export const createServiceRequest = async (clientId, data) => {
  return await prisma.serviceRequest.create({
    data: {
      title: data.title,
      description: data.description,
      requiredProfession: data.requiredProfession,
      clientId,
      status: 'PENDIENTE',
    },
    include: {
      client: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });
};

// Obtener las solicitudes del cliente autenticado
export const getMyServiceRequests = async (clientId) => {
  return await prisma.serviceRequest.findMany({
    where: {
      clientId,
    },
    include: {
      technician: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// Obtener solicitudes disponibles para técnicos
export const getAvailableServiceRequests = async (profession) => {
  return await prisma.serviceRequest.findMany({
    where: {
      status: 'PENDIENTE',
      technicianId: null,
      requiredProfession: profession,
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// Obtener la profesión del técnico autenticado
export const getTechnicianProfession = async (technicianId) => {
  return prisma.user.findUnique({
    where: { id: technicianId },
    select: {
      profession: true,
    },
  });
};