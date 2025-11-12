import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ImportComponent } from '../../layouts/components/import/import.component';
import { ThemeService } from '../../layouts/services/theme.service';

interface Basemap {
  key: string;
  label: string;
  url: string;
  thumbnail: string;
}

@Component({
  selector: 'app-fields',
  imports: [CommonModule, ImportComponent],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class FieldsComponent implements AfterViewInit, OnDestroy {
  map!: Map;
  vectorSource = new VectorSource();
  vectorLayer!: VectorLayer<VectorSource>;
  activeLayerKey = 'osm';
  menuOpen = false;
  private themeSub!: Subscription;
  private isDarkTheme = false;

  @ViewChild('importModal') importModal!: ImportComponent;

  baseMaps: Basemap[] = [
    { key: 'osm', label: 'OpenStreetMap', url: 'osm', thumbnail: 'assets/basemaps/temposm.jpg' },
    { key: 'satellite', label: 'Satellite', url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', thumbnail: 'assets/basemaps/satelitte.png' },
    { key: 'terrain', label: 'Terrain', url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', thumbnail: 'assets/basemaps/terrain.png' },
    { key: 'light', label: 'Light', url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png', thumbnail: 'assets/basemaps/light.png' },
    { key: 'dark', label: 'Dark', url: 'https://api.maptiler.com/maps/outdoor-v2-dark/{z}/{x}/{y}.png?key=zGX5n2Toi99Tvii4urI4', thumbnail: 'assets/basemaps/ago_downloaded.png' },
  ];

  baseLayers: { [key: string]: TileLayer<OSM | XYZ> } = {};

  constructor(private themeService: ThemeService) {}

  ngAfterViewInit(): void {
    this.initMap();

    this.themeSub = this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
      this.applyThemeToMap();
    });
  }

  initMap() {
    this.vectorLayer = new VectorLayer({ source: this.vectorSource });

    this.baseLayers = {
      osm: new TileLayer({ source: new OSM() }),
      satellite: new TileLayer({ source: new XYZ({ url: this.baseMaps[1].url }) }),
      terrain: new TileLayer({ source: new XYZ({ url: this.baseMaps[2].url }) }),
      light: new TileLayer({ source: new XYZ({ url: this.baseMaps[3].url }) }),
      dark: new TileLayer({
        source: new XYZ({
          url: this.baseMaps[4].url,
          attributions: '© MapTiler © OpenStreetMap contributors',
        }),
      }),
    };

    this.map = new Map({
      target: 'map',
      layers: [this.baseLayers['osm'], this.vectorLayer],
      view: new View({ center: [0, 0], zoom: 3 }),
    });
  }

  changeBaseLayer(key: string) {
    if (this.map && this.baseLayers[key]) {
      const layer = this.baseLayers[key];
      layer.setOpacity(0);
      this.map.getLayers().setAt(0, layer);

      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.05;
        if (opacity >= 1) clearInterval(fadeIn);
        layer.setOpacity(opacity);
      }, 30);

      this.activeLayerKey = key;
      this.menuOpen = false;
    }
  }

  toggleBasemapMenu() {
    this.menuOpen = !this.menuOpen;
  }

  applyThemeToMap() {
    if (this.isDarkTheme && ['osm', 'light', 'terrain'].includes(this.activeLayerKey)) {
      this.changeBaseLayer('dark');
    } else if (!this.isDarkTheme && this.activeLayerKey === 'dark') {
      this.changeBaseLayer('osm');
    }
  }

  openImportModal() {
    this.importModal.open();
  }

  onFeaturesImported(features: Feature[]) {
    this.vectorSource.clear();
    this.vectorSource.addFeatures(features);
    const extent = this.vectorSource.getExtent();
    this.map.getView().fit(extent, { duration: 1000, padding: [30, 30, 30, 30] });
  }

  ngOnDestroy(): void {
    if (this.themeSub) this.themeSub.unsubscribe();
  }
}
