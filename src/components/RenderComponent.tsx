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
    default:
      return null
  }
}

function HeroRenderer({ component }: { component: Extract<Component, { type: 'hero' }> }) {
  const { data } = component

  const backgroundStyle = data.backgroundType === 'image' && data.backgroundImage
    ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: data.backgroundColor }

  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end' }

  return (
    <div
      style={{
        ...backgroundStyle,
        height: data.height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignMap[data.align],
        justifyContent: justifyMap[data.justify],
        padding: '40px 20px',
      }}
      className="cursor-pointer"
    >
      <div style={{ maxWidth: '800px', width: '100%', textAlign: data.align }}>
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
            }}
          >
            {data.description}
          </p>
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
      style={{ height: data.height, position: 'relative', overflow: 'hidden' }}
      className="cursor-pointer"
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
  )
}

function VideoRenderer({ component }: { component: Extract<Component, { type: 'video' }> }) {
  const { data } = component

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  }

  const videoUrl = data.videoType === 'youtube'
    ? `${getYouTubeEmbedUrl(data.videoUrl)}?autoplay=${data.autoPlay ? 1 : 0}&mute=${data.muted ? 1 : 0}&loop=${data.loop ? 1 : 0}`
    : data.videoUrl

  return (
    <div style={{ height: data.height }} className="cursor-pointer">
      {data.videoType === 'youtube' ? (
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
  )
}

function DividerRenderer({ component }: { component: Extract<Component, { type: 'divider' }> }) {
  const { data } = component

  return (
    <div
      style={{
        height: data.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="cursor-pointer"
    >
      {data.showLine && (
        <div
          style={{
            width: '100%',
            height: data.lineWidth,
            backgroundColor: data.lineColor,
            borderStyle: data.lineStyle,
          }}
        />
      )}
    </div>
  )
}

function GridRenderer({ component }: { component: Extract<Component, { type: 'grid' }> }) {
  const { data } = component

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
        gap: data.gap,
        padding: '20px',
      }}
      className="cursor-pointer"
    >
      {data.items.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
