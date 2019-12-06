package modelo.inventario;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
import modelo.auth.usuarios.publicos.MotivoAltaBajaPublico;
import modelo.auth.usuarios.publicos.PermisoPublico;
import modelo.auth.usuarios.publicos.UsuarioPublico;
import modelo.auth.usuarios.publicos.ubicacion.DireccionEntrega;
import modelo.auth.usuarios.publicos.ubicacion.DireccionFacturacion;
import modelo.auth.usuarios.publicos.ubicacion.DireccionVivienda;
import modelo.producto.Producto;
import modelo.proveedor.Proveedor;

@Data
@Entity
@XmlRootElement
@Table()
@EntityListeners(AuditingEntityListener.class)
public class Inventario implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id", updatable = false, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
 
 	@NotBlank(message = "{inventario.existencias.notblank}")  
	@Column(name = "existencias", nullable = false)
	private double existencias;

 	@NotBlank(message = "{inventario.invMinimo.notblank}")  
	@Column(name = "invMinimo", nullable = false)
	private double invMinimo;


 	@NotBlank(message = "{inventario.invMaximo.notblank}")  
	@Column(name = "invMaximo", nullable = false)
	private double invMaximo;

 	@NotBlank(message = "{inventario.costo.notblank}")  
	@Column(name = "costo", nullable = false)
	private double costo;

 	@NotBlank(message = "{inventario.costoMayoreo.notblank}")  
	@Column(name = "costoMayoreo", nullable = false)
	private double costoMayoreo;

	@NotNull(message = "{inventario.proveedor.notnull}")
	@ManyToOne
	@JoinColumn(nullable = false)
	private Proveedor proveedor;

	@NotNull(message = "{inventario.producto.notnull}")
 	@ManyToOne
	@JoinColumn(nullable = false)
	private Producto producto;

	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime fechaAlta;

	@LastModifiedDate
	private LocalDateTime fechaActualizacion;
 

}
