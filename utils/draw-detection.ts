export function drawDetectionOverlay(
  ctx: CanvasRenderingContext2D,
  areas: Array<{
    x: number
    y: number
    width: number
    height: number
    type: string
    confidence: number
  }>,
  canvasWidth: number,
  canvasHeight: number,
) {
  // Clear any previous drawings
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // Draw each detection area
  areas.forEach((area) => {
    const x = area.x * canvasWidth
    const y = area.y * canvasHeight
    const width = area.width * canvasWidth
    const height = area.height * canvasHeight

    // Set styles based on detection type
    if (area.type === "facial_inconsistency") {
      ctx.strokeStyle = "rgba(255, 0, 0, 0.8)"
      ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
    } else if (area.type === "texture_artifact") {
      ctx.strokeStyle = "rgba(255, 165, 0, 0.8)"
      ctx.fillStyle = "rgba(255, 165, 0, 0.2)"
    } else {
      ctx.strokeStyle = "rgba(255, 255, 0, 0.8)"
      ctx.fillStyle = "rgba(255, 255, 0, 0.2)"
    }

    // Draw rectangle
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.stroke()
    ctx.fill()

    // Draw label
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(x, y - 20, 120, 20)
    ctx.fillStyle = "white"
    ctx.font = "12px Arial"
    ctx.fillText(`${area.type} (${Math.round(area.confidence * 100)}%)`, x + 5, y - 5)
  })
}
