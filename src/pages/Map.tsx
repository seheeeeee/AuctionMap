import React, { useRef, useEffect } from "react";
import { mapOptions, panoramaOptions } from "@src/constants/MapOptions";

function Map() {
    let mapRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current || !naver) return;
        const map = new naver.maps.Map(mapRef.current, mapOptions);
        const initLatLng = new naver.maps.LatLng(37.49094871675334, 127.05557683885974); //최초 좌표(도곡역)
        map.setCenter(initLatLng);
    }, []);
    return (
        <div
            className="map"
            ref={mapRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "none",
                position: "relative",
            }}
        />
    );
}

export default Map;
