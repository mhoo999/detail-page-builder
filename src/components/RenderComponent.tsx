import React, { useState, useEffect } from 'react'
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
      case 'faq':
        return <FAQRenderer component={component} />
      case 'tabs':
        return <TabsRenderer component={component} />
      case 'cta':
        return <CTARenderer component={component} />
      case 'beforeAfter':
        return <BeforeAfterRenderer component={component} />
      case 'countdown':
        return <CountdownRenderer component={component} />
      case 'review':
        return <ReviewRenderer component={component} />
      case 'iconList':
        return <IconListRenderer component={component} />
      case 'stickyBar':
        return <StickyBarRenderer component={component} />
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
                fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
                fontWeight: data.titleWeight,
                color: data.titleColor,
                marginBottom: '16px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {data.title}
            </h1>
          )}

          {data.showDescription && (
            <p
              style={{
                fontSize: data.descriptionSize.includes('px') ? data.descriptionSize : `${data.descriptionSize}px`,
                fontWeight: data.descriptionWeight,
                color: data.descriptionColor,
                marginBottom: '24px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                textAlign: data.descriptionAlign,
                letterSpacing: data.descriptionLetterSpacing.includes('px') ? data.descriptionLetterSpacing : `${data.descriptionLetterSpacing}px`,
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
                fontSize: data.buttonSize.includes('px') ? data.buttonSize : `${data.buttonSize}px`,
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

  // 이미지 배열이 변경될 때 currentIndex 조정
  useEffect(() => {
    if (data.images.length > 0 && currentIndex >= data.images.length) {
      setCurrentIndex(data.images.length - 1)
    } else if (data.images.length === 0) {
      setCurrentIndex(0)
    }
  }, [data.images.length, currentIndex])

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
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                padding: '15px 20px',
                cursor: 'pointer',
                fontSize: '48px',
                fontWeight: 'bold',
                lineHeight: '1',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)',
                zIndex: 10,
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
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                padding: '15px 20px',
                cursor: 'pointer',
                fontSize: '48px',
                fontWeight: 'bold',
                lineHeight: '1',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)',
                zIndex: 10,
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
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', whiteSpace: 'pre-wrap' }}>
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
                    textAlign: column.textAlign || 'left',
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
                {row.cells.map((cell, cellIndex) => {
                  const column = data.columns[cellIndex]
                  return (
                    <td
                      key={cellIndex}
                      style={{
                        backgroundColor: data.cellBackgroundColor,
                        color: data.cellTextColor,
                        padding: '12px',
                        border: `${data.borderWidth} solid ${data.borderColor}`,
                        whiteSpace: 'pre-wrap',
                        textAlign: column?.textAlign || 'left',
                      }}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FAQRenderer({ component }: { component: Extract<Component, { type: 'faq' }> }) {
  const { data } = component
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

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
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {data.showTitle && (
          <h2
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {data.titleText}
          </h2>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.items.map((item) => {
            const isOpen = openItems.has(item.id)
            return (
              <div
                key={item.id}
                style={{
                  border: `1px solid ${data.borderColor}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleItem(item.id)
                  }}
                  style={{
                    backgroundColor: data.questionBgColor,
                    color: data.questionColor,
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    style={{
                      color: data.iconColor,
                      fontSize: '20px',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    ▼
                  </span>
                </div>
                {isOpen && (
                  <div
                    style={{
                      backgroundColor: data.answerBgColor,
                      color: data.answerColor,
                      padding: '16px 20px',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TabsRenderer({ component }: { component: Extract<Component, { type: 'tabs' }> }) {
  const { data } = component
  const [activeTab, setActiveTab] = useState(data.items[0]?.id || '')

  useEffect(() => {
    if (data.items.length > 0 && !data.items.find(item => item.id === activeTab)) {
      setActiveTab(data.items[0].id)
    }
  }, [data.items, activeTab])

  const activeItem = data.items.find(item => item.id === activeTab)

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
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            borderBottom: `2px solid ${data.borderColor}`,
          }}
        >
          {data.items.map((item) => {
            const isActive = item.id === activeTab
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveTab(item.id)
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: isActive ? data.tabActiveColor : data.tabBgColor,
                  color: isActive ? data.tabActiveTextColor : data.tabTextColor,
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${data.tabActiveColor}` : '2px solid transparent',
                  marginBottom: '-2px',
                  cursor: 'pointer',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <div
          style={{
            backgroundColor: data.contentBgColor,
            color: data.contentTextColor,
            padding: '24px',
            border: `1px solid ${data.borderColor}`,
            borderTop: 'none',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
          }}
        >
          {activeItem?.content || ''}
        </div>
      </div>
    </div>
  )
}

function CTARenderer({ component }: { component: Extract<Component, { type: 'cta' }> }) {
  const { data } = component

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        padding: '60px 20px',
        ...(data.height && data.height !== 'auto' ? { minHeight: data.height } : {}),
      }}
      className="cursor-pointer"
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {data.showTitle && (
          <h2
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
              marginBottom: '16px',
            }}
          >
            {data.title}
          </h2>
        )}
        {data.showDescription && (
          <p
            style={{
              fontSize: data.descriptionSize.includes('px') ? data.descriptionSize : `${data.descriptionSize}px`,
              color: data.descriptionColor,
              marginBottom: '32px',
              lineHeight: '1.6',
            }}
          >
            {data.description}
          </p>
        )}
        <button
          style={{
            backgroundColor: data.buttonBgColor,
            color: data.buttonColor,
            fontSize: data.buttonSize.includes('px') ? data.buttonSize : `${data.buttonSize}px`,
            fontWeight: data.buttonWeight,
            padding: '16px 32px',
            borderRadius: data.buttonBorderRadius,
            border: 'none',
            cursor: 'pointer',
            width: data.buttonWidth,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  )
}

function BeforeAfterRenderer({ component }: { component: Extract<Component, { type: 'beforeAfter' }> }) {
  const { data } = component
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

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
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: data.imageHeight,
            overflow: 'hidden',
            borderRadius: '8px',
            userSelect: 'none',
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After Image (Background) */}
          <img
            src={data.afterImage}
            alt="After"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Before Image (Clipped) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={data.beforeImage}
              alt="Before"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Slider Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
              width: '4px',
              height: '100%',
              backgroundColor: data.sliderColor,
              cursor: 'ew-resize',
              zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Slider Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                backgroundColor: data.sliderColor,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ color: '#333', fontSize: '16px' }}>◀▶</span>
            </div>
          </div>

          {/* Labels */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: data.labelBgColor,
              color: data.labelColor,
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {data.beforeLabel}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: data.labelBgColor,
              color: data.labelColor,
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {data.afterLabel}
          </div>
        </div>
      </div>
    </div>
  )
}

function CountdownRenderer({ component }: { component: Extract<Component, { type: 'countdown' }> }) {
  const { data } = component
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(data.targetDate).getTime()
      const now = Date.now()
      const difference = targetTime - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      setIsExpired(false)
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [data.targetDate])

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: data.numberBgColor,
          color: data.numberColor,
          fontSize: data.numberSize.includes('px') ? data.numberSize : `${data.numberSize}px`,
          fontWeight: '700',
          padding: '16px 24px',
          borderRadius: '8px',
          minWidth: '80px',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div
        style={{
          color: data.labelColor,
          fontSize: data.labelSize.includes('px') ? data.labelSize : `${data.labelSize}px`,
          marginTop: '8px',
          fontWeight: '500',
        }}
      >
        {label}
      </div>
    </div>
  )

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
          textAlign: 'center',
        }}
      >
        {data.showTitle && !isExpired && (
          <h2
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
              marginBottom: '24px',
            }}
          >
            {data.title}
          </h2>
        )}
        {isExpired ? (
          <div
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
            }}
          >
            {data.expiredMessage}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <TimeBox value={timeLeft.days} label="일" />
            <TimeBox value={timeLeft.hours} label="시간" />
            <TimeBox value={timeLeft.minutes} label="분" />
            <TimeBox value={timeLeft.seconds} label="초" />
          </div>
        )}
      </div>
    </div>
  )
}

function ReviewRenderer({ component }: { component: Extract<Component, { type: 'review' }> }) {
  const { data } = component
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (data.autoPlay && data.items.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.items.length)
      }, data.interval)
      return () => clearInterval(timer)
    }
  }, [data.autoPlay, data.interval, data.items.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? data.starColor : '#d1d5db',
          fontSize: '20px',
        }}
      >
        ★
      </span>
    ))
  }

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
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {data.showTitle && (
          <h2
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {data.title}
          </h2>
        )}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {data.items.map((item) => (
              <div
                key={item.id}
                style={{
                  minWidth: '100%',
                  padding: '0 20px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    backgroundColor: data.cardBgColor,
                    color: data.cardTextColor,
                    padding: '32px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>{renderStars(item.rating)}</div>
                  <p
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.6',
                      marginBottom: '16px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{item.content}"
                  </p>
                  <p style={{ fontSize: '14px', color: '#666' }}>- {item.author}</p>
                </div>
              </div>
            ))}
          </div>
          {data.items.length > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px',
              }}
            >
              {data.items.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: index === currentIndex ? data.starColor : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function IconListRenderer({ component }: { component: Extract<Component, { type: 'iconList' }> }) {
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
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {data.showTitle && (
          <h2
            style={{
              fontSize: data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`,
              fontWeight: data.titleWeight,
              color: data.titleColor,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {data.title}
          </h2>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: data.layout === 'horizontal' ? 'row' : 'column',
            flexWrap: data.layout === 'horizontal' ? 'wrap' : 'nowrap',
            gap: data.gap,
            justifyContent: data.layout === 'horizontal' ? 'center' : 'flex-start',
            alignItems: data.layout === 'horizontal' ? 'center' : 'flex-start',
          }}
        >
          {data.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontSize: data.iconSize.includes('px') ? data.iconSize : `${data.iconSize}px`,
                  color: data.iconColor,
                  lineHeight: '1',
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: data.textSize.includes('px') ? data.textSize : `${data.textSize}px`,
                  color: data.textColor,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StickyBarRenderer({ component }: { component: Extract<Component, { type: 'stickyBar' }> }) {
  const { data } = component

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: data.backgroundColor,
        height: data.height,
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
      }}
      className="cursor-pointer"
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          height: '100%',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {data.showPrice && (
          <div>
            <span style={{ fontSize: '14px', color: '#666', marginRight: '8px' }}>
              {data.priceLabel}
            </span>
            <span
              style={{
                fontSize: data.priceSize.includes('px') ? data.priceSize : `${data.priceSize}px`,
                fontWeight: '700',
                color: data.priceColor,
              }}
            >
              {data.price}
            </span>
          </div>
        )}
        <button
          style={{
            backgroundColor: data.buttonBgColor,
            color: data.buttonColor,
            fontSize: data.buttonSize.includes('px') ? data.buttonSize : `${data.buttonSize}px`,
            fontWeight: data.buttonWeight,
            padding: '12px 32px',
            borderRadius: data.buttonBorderRadius,
            border: 'none',
            cursor: 'pointer',
            marginLeft: data.showPrice ? '0' : 'auto',
          }}
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  )
}
