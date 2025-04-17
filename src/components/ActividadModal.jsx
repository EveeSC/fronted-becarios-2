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

export default function ActividadModal({ actividad, open, handleClose, onAction, isInscrita }) {
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
            {actividad?.titulo || 'Detalles de la Actividad'}
          </Typography>
          
          <div className="space-y-3 text-[#8F8E8E]">
            <Typography variant="body1">
              <strong>Horas acreditadas:</strong> {actividad?.horas || 'No especificado'}
            </Typography>
            
            <Typography variant="body1">
              <strong>Fecha:</strong> {actividad?.fecha || 'No especificada'}
            </Typography>
            
            <Typography variant="body1">
              <strong>Horario:</strong> {actividad?.horario || 'No especificado'}
            </Typography>
            
            {actividad?.lugar && (
              <Typography variant="body1">
                <strong>Lugar:</strong> {actividad.lugar}
              </Typography>
            )}
          </div>
          
          {actividad?.descripcion && (
            <>
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
            </>
          )}
          
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
        </Box>
      </Fade>
    </Modal>
  );
}