interface mapOptionInterface extends naver.maps.MapOptions {
    tileDuration: number;
}

const mapOptions: mapOptionInterface = {
    zoom: 7,
    zoomControl: false,
    tileTransition: true,
    mapTypeControl: false,
    mapTypeId: naver.maps.MapTypeId.NORMAL, //지도 타입(일반, 위성 등)
    tileDuration: 400,
    maxZoom: 20,
    minZoom: 6,
    disableDoubleClickZoom: true,
    disableDoubleTapZoom: true,
};

const panoramaOptions: naver.maps.PanoramaOptions = {
    pov: {
        pan: -135,
        tilt: -20,
        fov: 100,
    },
    flightSpot: false,
    aroundControl: false,
};

export { mapOptions, panoramaOptions };
