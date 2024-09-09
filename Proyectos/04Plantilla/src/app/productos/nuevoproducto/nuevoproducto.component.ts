import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { iva } from 'src/app/Interfaces/iva';
import { ivaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIvas: iva[] = [];
  producto: IProducto;
  id: number = 0;
  titulo = '';
  frm_Producto: FormGroup;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaService: ivaService,
    private productoservice: ProductoService,
    private navegacion: Router,
    private ruta: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.id = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaService.todos().subscribe((data) => this.listaIvas = data);
    this.crearFormulario();
    if(this.id>0)
    {
      this.productoservice.uno(this.id).subscribe(
        (data)=>{
          this.frm_Producto.patchValue(data)
        }
      )
    }
    

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }
  /*formData.append('Codigo_Barras', producto.Codigo_Barras);
  formData.append('Nombre_Producto', producto.Nombre_Producto);
  formData.append('Graba_IVA', producto.Graba_IVA.toString());
  formData.append('Unidad_Medida_idUnidad_Medida', producto.Unidad_Medida_idUnidad_Medida.toString());
  formData.append('IVA_idIVA', producto.IVA_idIVA.toString());
  formData.append('Cantidad', producto.Cantidad.toString());
  formData.append('Valor_Compra', producto.Valor_Compra.toString());
  formData.append('Valor_Venta', producto.Valor_Venta.toString());
  formData.append('Proveedores_idProveedores', producto.Proveedores_idProveedores.toString());
  */
  grabar() {
    this.producto = this.frm_Producto.value;
    if(this.id>0){
      this.producto.idProductos = this.id
      this.productoservice.actualizar(this.producto).subscribe(
        (data)=>{
          console.log(data)
          Swal.fire('Exito', 'El producto se ha actualizado', 'success');
          this.navegacion.navigate(['/productos']);
        }
        )
    }
    else{
      this.productoservice.insertar(this.producto).subscribe(
        (data)=>{
          console.log(data)
          Swal.fire('Exito', 'El producto se ha guardado', 'success');
          this.navegacion.navigate(['/productos']);
        }
        )
    }
    
    }
}
