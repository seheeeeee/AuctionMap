import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { Common } from "@src/styles/Common";

interface FloatingMenuProps {
    map: naver.maps.Map | null;
    mapLayerHandler: {
        activeRoadMap: (map: naver.maps.Map) => void;
        activeCadastralMap: (map: naver.maps.Map) => void;
        activeSatelliteMap: (map: naver.maps.Map, mapType: "HYBRID" | "NORMAL") => void;
    };
}
function FloatingMenu({ map, mapLayerHandler }: FloatingMenuProps) {
    const initLatLng = new naver.maps.LatLng(37.49094871675334, 127.05557683885974); //최초 좌표(도곡역)
    const hybridBtn = useRef<HTMLButtonElement>(null);
    const normalBtn = useRef<HTMLButtonElement>(null);
    const mapTypeRef = useRef<HTMLButtonElement>(null);

    const [userLocation, setUserLocation] = useState<naver.maps.LatLng>(initLatLng);
    const [userMarker, setUserMarker] = useState<naver.maps.Marker | null>(null);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isHybrid, setIsHybrid] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            const { latitude, longitude } = pos.coords;
            const position = new naver.maps.LatLng(latitude, longitude);
            setUserLocation(position);
        });
    }, []);

    useEffect(() => {
        const marker =
            map &&
            new naver.maps.Marker({
                position: userLocation,
                map,
                clickable: true,
                zIndex: 3,
                title: "useLocation",
            });
        setUserMarker(marker);
    }, [userLocation, map]);

    const { activeRoadMap, activeCadastralMap, activeSatelliteMap } = mapLayerHandler;
    const isActive = (elem: any) => {
        return elem.className === "active";
    };
    const addActiveClassName = (elem: any) => {
        elem.className = isActive(elem) ? "inactive" : "active";
    };

    useEffect(() => {
        if (hybridBtn.current && normalBtn.current) {
            if (isHybrid) {
                hybridBtn.current.className = "active";
                normalBtn.current.className = "inactive";
            } else {
                hybridBtn.current.className = "inactive";
                normalBtn.current.className = "active";
            }
        }
    }, [isHybrid]);

    useEffect(() => {
        if (map) {
            map?.getMapTypeId() === "hybrid" ? setIsHybrid(true) : setIsHybrid(false);
        }
    }, [map]);

    return (
        <div css={floatingMenuWrap}>
            <ul css={mainMenu}>
                <li>
                    <button
                        onClick={(e) => {
                            setIsSubMenuOpen((prev) => !prev);
                            addActiveClassName(e.target);
                        }}
                        ref={mapTypeRef}
                    >
                        지도
                    </button>
                    <ol css={subMenu} className={isSubMenuOpen ? "show" : "hide"}>
                        <li>
                            <button
                                ref={hybridBtn}
                                className="active"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isActive(e.target)) {
                                        map && activeSatelliteMap(map, "NORMAL");
                                        setIsHybrid(false);
                                    } else {
                                        map && activeSatelliteMap(map, "HYBRID");
                                        setIsHybrid(true);
                                    }
                                }}
                            >
                                위성
                            </button>
                        </li>
                        <li>
                            <button
                                ref={normalBtn}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (isActive(e.target)) {
                                        map && activeSatelliteMap(map, "HYBRID");
                                        setIsHybrid(true);
                                    } else {
                                        map && activeSatelliteMap(map, "NORMAL");
                                        setIsHybrid(false);
                                    }
                                }}
                            >
                                일반
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    map && activeCadastralMap(map);
                                    addActiveClassName(e.target);
                                }}
                            >
                                지적
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    map && activeRoadMap(map);
                                    addActiveClassName(e.target);
                                }}
                            >
                                거리뷰
                            </button>
                        </li>
                    </ol>
                </li>
                <li>
                    <button
                        onClick={(e: any) => {
                            addActiveClassName(e.target);
                            if (isActive(e.target)) {
                                userMarker?.setMap(map);
                                map && map.setOptions({ center: userLocation, zoom: 18 });
                            } else {
                                userMarker && userMarker.setMap(null);
                            }
                        }}
                    >
                        내위치
                    </button>
                </li>
            </ul>
        </div>
    );
}

const floatingMenuWrap = css`
    position: absolute;
    right: 10px;
    top: 110px;
    z-index: 993;
`;

const mainMenu = css`
    & > li {
        position: relative;
    }
    & > li > button {
        width: 44px;
        height: 44px;
        margin-bottom: 5px;
        border-radius: 100%;
        background-color: #fff;
        text-align: center;
        font-size: 12px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
        white-space: nowrap;
    }
    button.inactive {
        background: #fff;
        color: ${Common.colors.navyPrimary};
    }
    button.active {
        background: ${Common.colors.aucMarkerColor};
        color: #fff;
        border-color: #fff;
    }
    .clicked {
        background: ${Common.colors.aucMarkerColor};
        color: #fff;
        border-color: #fff;
    }
    & > li:nth-of-type(4) button {
        word-break: keep-all;
    }
    .hideMarkerButton {
        display: block;
        width: 44px;
        height: 44px;
        font-size: 0;
        text-indent: -9999px;
        border-radius: 100%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
`;
const subMenu = css`
    width: 180px;
    height: 44px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    position: absolute;
    left: -180px;
    top: 0px;
    &.show {
        display: flex;
    }
    &.hide {
        display: none;
    }
    & > li > button {
        width: 40px;
        height: 40px;
        margin-right: 5px;
        border-radius: 100%;
        background-color: #fff;
        text-align: center;
        font-size: 12px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
    }
`;

export default FloatingMenu;
