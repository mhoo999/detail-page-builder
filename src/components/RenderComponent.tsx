import { useState, useEffect } from 'react'
import { Component } from '../types'

interface RenderComponentProps {
  component: Component
}

export function RenderComponent({ component }: RenderComponentProps) {
  switch (component.type) {
    case 'hero':
      return <HeroRenderer component={component} />
    case 'slider':
      return <SliderRenderer component={component} />
    case 'video':
      return <VideoRenderer component={component} />
    case 'divider':
      return <DividerRenderer component={component} />
      case 'grid':
        return <GridRenderer component={component} />
      case 'table':
        return <TableRenderer component={component} />
      default:
        return null
  }
}

function HeroRenderer({ component }: { component: Extract<Component, { type: 'hero' }> }) {
  const { data } = component

  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end' }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        position: 'relative',
        minHeight: data.height,
      }}
      className="cursor-pointer"
    >
      {data.showOverlayImage && data.overlayImage && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${data.overlayImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      )}
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '40px 20px',
          height: data.height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignMap[data.align],
          justifyContent: justifyMap[data.justify],
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: '100%', textAlign: data.align }}>
          {data.showSectionTitle && (
            <div
              style={{
                display: 'inline-block',
                backgroundColor: data.sectionTitleBgColor,
                color: data.sectionTitleColor,
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
              }}
            >
              {data.sectionTitle}
            </div>
          )}

          {data.showTitle && (
            <h1
              style={{
                fontSize: data.titleSize,
                fontWeight: data.titleWeight,
                color: data.titleColor,
                marginBottom: '16px',
              }}
            >
              {data.title}
            </h1>
          )}

          {data.showDescription && (
            <p
              style={{
                fontSize: data.descriptionSize,
                fontWeight: data.descriptionWeight,
                color: data.descriptionColor,
                marginBottom: '24px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {data.description}
            </p>
          )}

          {data.showDescriptionImage && data.descriptionImage && (
            <div style={{ marginBottom: '24px' }}>
              <img
                src={data.descriptionImage}
                alt="Description"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          )}

          {data.showButton && (
            <button
              style={{
                backgroundColor: data.buttonBgColor,
                color: data.buttonColor,
                fontSize: data.buttonSize,
                fontWeight: data.buttonWeight,
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {data.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function SliderRenderer({ component }: { component: Extract<Component, { type: 'slider' }> }) {
  const { data } = component
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (data.autoPlay && data.images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.images.length)
      }, data.interval)
      return () => clearInterval(timer)
    }
  }, [data.autoPlay, data.interval, data.images.length])

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        padding: '40px 20px',
      }}
      className="cursor-pointer"
    >
      <div
        style={{
          maxWidth: data.imageWidth,
          margin: '0 auto',
          height: data.height,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {data.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        ))}

        {data.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length)
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev + 1) % data.images.length)
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ›
            </button>
          </>
        )}

        {data.showIndicators && data.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
            }}
          >
            {data.images.map((_, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VideoRenderer({ component }: { component: Extract<Component, { type: 'video' }> }) {
  const { data } = component

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return ''
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  }

  const youtubeEmbedUrl = data.videoType === 'youtube' ? getYouTubeEmbedUrl(data.videoUrl) : ''
  const videoUrl = data.videoType === 'youtube' && youtubeEmbedUrl
    ? `${youtubeEmbedUrl}?autoplay=${data.autoPlay ? 1 : 0}&mute=${data.muted ? 1 : 0}&loop=${data.loop ? 1 : 0}`
    : data.videoUrl

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        padding: '40px 20px',
      }}
      className="cursor-pointer"
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto', height: data.height }}>
        {!data.videoUrl ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              color: '#9ca3af',
            }}
          >
            비디오 URL을 입력하세요
          </div>
        ) : data.videoType === 'youtube' ? (
          youtubeEmbedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                color: '#9ca3af',
              }}
            >
              유효하지 않은 YouTube URL입니다
            </div>
          )
        ) : (
          <video
            width="100%"
            height="100%"
            controls
            autoPlay={data.autoPlay}
            muted={data.muted}
            loop={data.loop}
            style={{ objectFit: 'cover' }}
          >
            <source src={data.videoUrl} />
          </video>
        )}
      </div>
    </div>
  )
}

function DividerRenderer({ component }: { component: Extract<Component, { type: 'divider' }> }) {
  const { data } = component

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        height: data.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="cursor-pointer"
    >
      {data.showLine && (
        <div style={{ maxWidth: '1140px', width: '100%', padding: '0 20px' }}>
          <div
            style={{
              width: '100%',
              height: data.lineWidth,
              backgroundColor: data.lineColor,
              borderStyle: data.lineStyle,
            }}
          />
        </div>
      )}
    </div>
  )
}

function GridRenderer({ component }: { component: Extract<Component, { type: 'grid' }> }) {
  const { data } = component

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        padding: '40px 20px',
        ...(data.height && data.height !== 'auto' ? { minHeight: data.height } : {}),
      }}
      className="cursor-pointer"
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
          gap: data.gap,
        }}
      >
        {data.items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: data.itemBackgroundColor,
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: data.iconSize,
                height: data.iconSize,
                marginBottom: '16px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TableRenderer({ component }: { component: Extract<Component, { type: 'table' }> }) {
  const { data } = component

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        padding: '40px 20px',
        ...(data.height && data.height !== 'auto' ? { minHeight: data.height } : {}),
      }}
      className="cursor-pointer"
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto', overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: `${data.borderWidth} solid ${data.borderColor}`,
          }}
        >
          <thead>
            <tr>
              {data.columns.map((column) => (
                <th
                  key={column.id}
                  style={{
                    backgroundColor: data.headerBackgroundColor,
                    color: data.headerTextColor,
                    padding: '12px',
                    textAlign: 'left',
                    border: `${data.borderWidth} solid ${data.borderColor}`,
                    fontWeight: '600',
                    ...(column.width && column.width !== 'auto' ? { width: column.width } : {}),
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      backgroundColor: data.cellBackgroundColor,
                      color: data.cellTextColor,
                      padding: '12px',
                      border: `${data.borderWidth} solid ${data.borderColor}`,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
