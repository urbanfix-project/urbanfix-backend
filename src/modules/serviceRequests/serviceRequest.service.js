import prisma from '../../config/prisma.js';

// Crear una solicitud de servicio
export const createServiceRequest = async (clientId, data) => {
  return await prisma.serviceRequest.create({
    data: {
      title: data.title,
      description: data.description,
      address: data.address,
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


// Aceptar una solicitud de servicio
export const acceptServiceRequest = async (id, technicianId) => {
  const technician = await prisma.user.findUnique({
    where: { id: technicianId },
    select: { profession: true },
  });

  if (!technician?.profession) {
    return { error: 'NO_PROFESSION' };
  }

  const request = await prisma.serviceRequest.findUnique({
    where: { id },
  });

  if (!request) {
    return { error: 'NOT_FOUND' };
  }

  if (request.requiredProfession !== technician.profession) {
    return { error: 'WRONG_PROFESSION' };
  }

  // Actualización atómica: evita doble aceptación
  const result = await prisma.serviceRequest.updateMany({
    where: {
      id,
      status: 'PENDIENTE',
      technicianId: null,
      requiredProfession: technician.profession,
    },
    data: {
      status: 'ACEPTADA',
      technicianId,
    },
  });

  if (result.count === 0) {
    return { error: 'NOT_AVAILABLE' };
  }

  const updated = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      client: {
        select: { name: true, phone: true, email: true },
      },
      technician: {
        select: { name: true, email: true },
      },
    },
  });

  return { data: updated };
};

// Rechazar una solicitud de servicio
export const rejectServiceRequest = async (id, technicianId) => {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
  });

  if (!request) {
    return { error: 'NOT_FOUND' };
  }

  if (request.technicianId !== technicianId) {
    return { error: 'FORBIDDEN' };
  }

  // Solo permitimos rechazar una asignación aceptada.
  const result = await prisma.serviceRequest.updateMany({
    where: {
      id,
      technicianId,
      status: 'ACEPTADA',
    },
    data: {
      status: 'RECHAZADA',
      technicianId: null,
    },
  });

  if (result.count === 0) {
    return { error: 'INVALID_STATUS' };
  }

  const updated = await prisma.serviceRequest.findUnique({
    where: { id },
  });

  return { data: updated };
};
