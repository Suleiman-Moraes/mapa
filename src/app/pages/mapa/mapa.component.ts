import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(
    private service: ServiceService,
    private route: ActivatedRoute
  ) {}

  public lat = -16.67127375644847;
  public lng = -49.23877828235197;

  public origin: any = { lat: -16.68470614, lng: -49.25463259 };
  public destination: any = { lat: -16.67127375644847, lng: -49.23877828235197 };

  id;
  pedido;

  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png',
      draggable: false,
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      draggable: false,
      // infoWindow: `
      //   <h4>Hello<h4>
      //   <a href='http://www-e.ntust.edu.tw/home.php' target='_blank'>Taiwan Tech</a>
      //   `
    },
  };

  ngOnInit() {
    this.id = 0;
    this.route.paramMap.pipe(
      switchMap(params => params.get('id'))
    ).subscribe(
      (param) => {
        this.id += param;
      }
    );
    this.service.buscarPedidoEmAndamento(this.id).subscribe(
      responseApi => {
        this.pedido = responseApi.data;
        this.destination = { lat: this.pedido.lat, lng: this.pedido.log };
      }
    );
  }
}
//-16.7413042578999
//-49.27694320678711