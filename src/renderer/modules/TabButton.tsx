import React from "react";
import { useLocation, Link } from "react-router-dom";
interface TabProps {
    path: string;
    name?: string;
    reg: React.ComponentType;
    filled: React.ComponentType
}
export default function TabButton(props : TabProps) {
    const loc = useLocation()
    const isPage = loc.pathname === props.path
    const Icon = isPage ? props.filled : props.reg
    return (
        <Link to={props.path} className="gcui-tab-link">
            <div className={"gcui-tabs" + (isPage ? ' active' : '')}>
                <Icon />&nbsp;<strong>{props.name}</strong>
            </div>
        </Link>
    )
}