'use client'

import { useEffect } from "react"

const VERTICAL_AD_ID = '1bdf87bb0f19d89d5a93b25763616ac3'

export default function VerticalAd() {
    useEffect(() => {
        const container = document.getElementById(`ad-${VERTICAL_AD_ID}`)
        if (!container) return

        // Load ad script
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.innerHTML = `
      var atOptions = {
        'key' : '${VERTICAL_AD_ID}',
        'format' : 'iframe',
        'height' : 600,
        'width' : 300,
        'params' : {}
      };
    `
        container.appendChild(script)

        const adScript = document.createElement('script')
        adScript.type = 'text/javascript'
        adScript.src = 'https://www.highperformanceformat.com/' + VERTICAL_AD_ID + '/invoke.js'
        container.appendChild(adScript)
    }, [])

    return (
        <div className="flex justify-center py-4">
            <div id={`ad-${VERTICAL_AD_ID}`} style={{ minHeight: '600px', minWidth: '300px' }}></div>
        </div>
    )
}
