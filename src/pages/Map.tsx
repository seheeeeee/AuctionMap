import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Common } from "@src/styles/Common";
import { mapOptions, panoramaOptions } from "@src/constants/MapOptions";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, FloatingMenu } from "@src/components";
import zIndexOfMarker from "@src/constants/zIndexOfMarker";
import useGetMarkerContents from "@src/hooks/map/useGetMarkerContents";

function Map() {
    const mapRef = useRef<null | HTMLDivElement>(null);
    const initLatLng = new naver.maps.LatLng(37.49094871675334, 127.05557683885974); //최초 좌표(도곡역)

    const [mapState, setMapState] = useState<naver.maps.Map>();
    const [markerContents, setMarkerContents] = useState<any[]>([]);
    const [markerType, setMarkerType] = useState<"product" | "real">("product");
    const [renderMarkerList, setRenderMarkerList] = useState<any[]>([]);

    const [isStreetActive, setIsStreetActive] = useState(false);
    const [isCadastralShow, setIsCadastralShow] = useState(false);
    const [isPanoViewActive, setIsPanoViewActive] = useState(false);

    let streetLayer = new naver.maps.StreetLayer(); //거리뷰
    let cadastralLayer = new naver.maps.CadastralLayer(); //지적도

    const fetchMarkerContents = (zoom: number) => {
        const res = useGetMarkerContents(zoom);
        setMarkerContents(res);
    };
    useEffect(() => {
        if (!mapRef.current || !naver) return;
        const map = new naver.maps.Map(mapRef.current, mapOptions);
        // map.setCenter(initLatLng);
        fetchMarkerContents(7);
        setMapState(map);

        map.addListener("zoom_changed", () => {
            //줌레벨 변경시 마커 데이터 세팅
            const z = map.getZoom();
            fetchMarkerContents(z);
        });
    }, []);

    //마커 생성 함수
    const renderMarker = (
        markerElem: string | HTMLElement,
        position: { lat: number; lng: number },
        zIndex: number,
        visible: boolean,
    ): naver.maps.Marker => {
        return new naver.maps.Marker({
            position: new naver.maps.LatLng(position.lat, position.lng),
            map: mapState,
            clickable: true,
            zIndex,
            icon: {
                content: markerElem,
                anchor: new naver.maps.Point(25, 35),
                origin: new naver.maps.Point(50, 50),
            },
            visible,
        });
    };
    //지도에서 마커 지우기
    const hideMarkers = () => {
        setRenderMarkerList((prev) => prev.map((marker) => marker.setMap(null)));
    };
    //지도에 마커 붙이기
    useEffect(() => {
        if (!mapRef.current || !naver) return;

        const newMarkerList: any[] = [];

        hideMarkers();

        markerContents.map((content) => {
            let { type, count, lat, lng, item, displayName, clickType, real } = content;
            const markerElement = renderToStaticMarkup(
                Marker({
                    type,
                    displayName,
                    count,
                    item,
                    real,
                    markerType,
                }),
            );
            const position = {
                lat,
                lng,
            };
            const zIndex = zIndexOfMarker[type];
            newMarkerList.push(renderMarker(markerElement, position, zIndex, true));
        });
        setRenderMarkerList(newMarkerList);
    }, [markerContents]);
    //플로팅 버튼(레이어 변경) 클릭 이벤트
    const mapLayerHandler = {
        activeRoadMap: (map: naver.maps.Map) => {
            //거리뷰
            streetLayer.setMap(map);
            if (isStreetActive) {
                streetLayer.setMap(null);
                setIsPanoViewActive(false);
            } else {
                streetLayer.setMap(map);
            }
            setIsStreetActive(!isStreetActive);
        },
        activeCadastralMap: (map: naver.maps.Map) => {
            //지적도
            cadastralLayer.setMap(map);
            if (isCadastralShow) {
                cadastralLayer.setMap(null);
            } else {
                cadastralLayer.setMap(map);
            }
            setIsCadastralShow(!isCadastralShow);
        },
        activeSatelliteMap: (map: naver.maps.Map, mapType: "HYBRID" | "NORMAL") => {
            //위성도
            if (mapType !== "NORMAL") {
                map.setMapTypeId(naver.maps.MapTypeId.HYBRID);
            } else {
                map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
            }
        },
    };

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
            css={mapWrap}
        >
            <FloatingMenu map={mapState ?? null} mapLayerHandler={mapLayerHandler} />
        </div>
    );
}

const mapWrap = css`
    .marker_clu {
        min-width: 54px;
        padding: 10px;
        border-radius: 24px;
        background-color: ${Common.colors.aucMarkerColor};
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.18);
        text-align: center;
        p {
            color: ${Common.colors.white};
            text-align: center;
            white-space: nowrap;
        }
        .marker_clu_region {
            ${Common.textStyle.mapMarker_13_medium}
            margin-bottom: 4px;
        }
        .marker_clu_count {
            ${Common.textStyle.mapMarker_14_medium}
        }
    }
`;
export default Map;
