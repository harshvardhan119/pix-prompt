'use client'

import { useEffect } from "react"

const HORIZONTAL_AD_ID = 'a5e9ab4436505ff557d75ee0a0e14c4c'

export default function HorizontalAd() {
    useEffect(() => {
        const container = document.getElementById(`ad-${HORIZONTAL_AD_ID}`)
        if (!container) return

        // Load ad script
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.innerHTML = `
      var atOptions = {
        'key' : '${HORIZONTAL_AD_ID}',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `
        container.appendChild(script)

        const adScript = document.createElement('script')
        adScript.type = 'text/javascript'
        adScript.src = 'https://www.highperformanceformat.com/' + HORIZONTAL_AD_ID + '/invoke.js'
        container.appendChild(adScript)
    }, [])

    return (
        <div className="flex justify-center py-4">
            <div id={`ad-${HORIZONTAL_AD_ID}`} style={{ minHeight: '90px' }}></div>
        </div>
    )
}
