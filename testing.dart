  
   final finalList = FFAppState()
        .wifiListOffline
        .where((e) => e.city == widget.mapCity)
        .toList();
  
  _getLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return;
    }

    final position = await Geolocator.getCurrentPosition();
    setState(() {
      _currentUserLocation =
          latLng.LatLng(position.latitude, position.longitude);
      _updateUserLocationMarker();
    });
  }