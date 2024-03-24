import React from "react"

interface WindowToolsButton {
    icon: React.ComponentType,
    title: string,
    onClick: () => void
}
export default function WindowToolsButton(tools:WindowToolsButton) {
    return (
        <div className="gcui-window-button" title={tools.title} onClick={tools.onClick}>
            <tools.icon />
        </div>
    )
}