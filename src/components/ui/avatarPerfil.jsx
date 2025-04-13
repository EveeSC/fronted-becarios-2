// components/ui/avatarPerfil.jsx
'use client'

import { useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const StyledAvatar = styled(Avatar)(({ size = 96 }) => ({
  width: size,
  height: size,
  border: '2px solid #e5e7eb',
  fontSize: size * 0.4,
  backgroundColor: '#3b82f6'
}))

export default function AvatarPerfil({
  src,
  alt = "Foto de perfil",
  editable = false,
  fallbackText = "LM",
  size = 96
}) {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative inline-block">
      <StyledAvatar
        alt={alt}
        src={preview || src}
        size={size}
        style={{ backgroundColor: (preview || src) ? 'transparent' : '#3b82f6' }}
      >
        {!(preview || src) && fallbackText}
      </StyledAvatar>

      {editable && (
        <>
          <Tooltip title="Cambiar foto" arrow>
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <CameraAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </>
      )}
    </div>
  )
}