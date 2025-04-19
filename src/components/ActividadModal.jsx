'use client';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  outline: 'none',
};

export default function ActividadModal({ 
  actividad, 
  open, 
  handleClose, 
  onAction, 
  isInscrita,
  loadingDetalles 
}) {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-HN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!actividad) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" color="error">
              No se encontraron detalles de la actividad
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-detalles-actividad"
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <IconButton
            aria-label="cerrar modal"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#8F8E8E',
              '&:hover': {
                color: '#6D6C6C',
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          {loadingDetalles ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography 
                id="modal-detalles-actividad"
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  pr: 4,
                  color: '#253A69'
                }}
              >
                {actividad.titulo}
              </Typography>
              
              <div className="space-y-3 text-[#8F8E8E]">
                <Typography variant="body1">
                  <strong>Horas acreditadas:</strong> {actividad.horas}
                </Typography>
                
                <Typography variant="body1">
                  <strong>Fecha:</strong> {formatDate(actividad.fecha)}
                </Typography>
                
                <Typography variant="body1">
                  <strong>Horario:</strong> {actividad.horario}
                </Typography>
                
                <Typography variant="body1">
                  <strong>Lugar:</strong> {actividad.lugar}
                </Typography>
              </div>
              
              <hr className="my-4 border-t border-gray-200" />
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  lineHeight: 1.6,
                  color: '#8F8E8E'
                }}
              >
                {actividad.descripcion}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mt: 3
              }}>
                <Button 
                  variant="contained"
                  onClick={onAction}
                  sx={{
                    backgroundColor: '#253A69',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#1E2E56',
                    },
                    px: 4,
                    py: 1
                  }}
                >
                  {isInscrita ? 'MARCAR ASISTENCIA' : 'INSCRIBIRME'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}