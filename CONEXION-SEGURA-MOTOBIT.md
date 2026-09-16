# CONEXIÓN SEGURA — micro:bit + SparkFun moto:bit (equipo escolar)

Fuente oficial SparkFun (orientación):
https://learn.sparkfun.com/tutorials/getting-started-with-the-red-hat-colab-robot/build-complete-the-wiring

Placa: **SparkFun moto:bit DEV-14213**

---

## REGLA DE ORO (no quemar / no forzar)

1. **Sin baterías** y **USB desconectado** mientras encajas o desconectas.
2. Interruptor de motores en **STOP MOTORS** (no RUN) mientras programas.
3. **Nunca fuerces**. Si no entra suave, está al revés.
4. En el jack del moto:bit: solo el portapilas del kit (**4× AA**).  
   Voltaje del jack: **máx. 11 V** (SparkFun). No uses adaptadores raros.
5. Programar por el **USB de la micro:bit**, no inventes otro cable.

---

## 1) Cómo reconocer cada cara

### micro:bit — cara correcta (“arriba”)
- Se ve la **matriz de LEDs 5×5**
- Se ven botones **A** y **B**
- El conector **USB** (micro-USB) queda accesible

### micro:bit — cara incorrecta (“abajo”)
- Se ven chips, batería chica, etc.
- **NO** debe quedar mirando hacia ti al insertar

### moto:bit — cara de trabajo (“arriba”)
- Se ven **chips**, pines de sensores, conectores de motores
- Se ve el **jack de batería** (barrel jack)
- Se ve el interruptor **STOP MOTORS / RUN MOTORS**

### moto:bit — cara de atrás
- Dice `DEV-14213`, logo sparkfun, `moto:bit`
- Esa cara **no** es donde miran los LEDs

---

## 2) Encajar micro:bit en moto:bit (paso a paso)

### Antes
- [ ] Batería **desenchufada** del jack
- [ ] USB **desconectado**
- [ ] Interruptor en **STOP MOTORS**

### Orientación correcta (SparkFun)
> El “arriba” del moto:bit es el lado con pines, chips y jack de poder.  
> El “arriba” de la micro:bit es el lado de los **LEDs** (sin chips).  
> **Es posible ponerla al revés** — no lo hagas.

Checklist visual cuando está bien:

| Debes ver | No debe pasar |
|-----------|----------------|
| LEDs de la micro:bit **del mismo lado** que los chips/pines del moto:bit | LEDs mirando hacia la parte de atrás del moto:bit |
| Botones **A** y **B** visibles y usables | micro:bit forzada o torcida |
| Borde dorado de la micro:bit **dentro** del conector ranurado del moto:bit | Solo a medias / floja |
| USB de la micro:bit libre para enchufar el cable | USB tapado o imposible de conectar |

### Cómo insertar
1. Pon el **moto:bit** con la cara de chips/pines **hacia arriba**.
2. Toma la **micro:bit** con los **LEDs hacia arriba** (misma dirección).
3. El borde **dorado** (edge connector) entra en la **ranura** del moto:bit.
4. Empuja **recto**, suave y parejo, hasta el fondo.
5. No debe hacer falta fuerza. Si resiste: sácala, gira 180° (solo el “lado LEDs”) y prueba de nuevo.

### Cómo saber si quedó mal (apágalo y corrige)
- Los LEDs quedan mirando al revés (hacia la parte sin componentes útiles).
- No puedes ver bien A/B.
- El USB no queda usable.
- La placa hace contacto raro / no enciende al conectar USB.

---

## 3) Sensor de humedad (banano-riego) → moto:bit

Conector de 3 pines del moto:bit etiquetado **P0** (fila: señal / 3V3 / GND).

| Cable del sensor | Pin en moto:bit (P0) |
|------------------|----------------------|
| **Negro** | **GND** |
| **Rojo** | **3V3** (o V / 3.3V) |
| **Amarillo** | pin de **señal P0** (el que no es energía) |

- Usa cable Dupont de 3 pines **o** 3 lagartos.
- Con batería y USB **desconectados** al cablear.
- No cruzar rojo con negro.

---

## 4) Bomba → moto:bit

1. Los **2 cables** de la bomba al conector de motor **LEFT** (o RIGHT).
2. Portapilas **4× AA** al **barrel jack** del moto:bit.
3. Mientras codifican: interruptor **STOP MOTORS**.
4. Para probar riego: interruptor **RUN MOTORS** + en el código `enable motors On`.

La bomba **no** va a un pin digital suelto: va al **conector de motor**.

---

## 5) Orden seguro de encendido

1. Cablear todo (sensor + bomba) con energía **off**.
2. Encajar micro:bit bien orientada.
3. Interruptor **STOP MOTORS**.
4. Conectar **USB** a la micro:bit → cargar el programa MakeCode.
5. Desconectar USB (o dejarlo si van a depurar).
6. Conectar **baterías** al jack.
7. Solo entonces: **RUN MOTORS** para probar la bomba.

---

## 6) Programar por bloques (MakeCode)

1. https://makecode.microbit.org/?lang=es  
2. Extensiones → `moto-bit` / SparkFun moto-bit  
3. Seguir `GUIA-BLOQUES-MOTOBIT.md`  
4. O pegar `makecode-motobit-riego.js` y volver a **Bloques**

Lógica:
- % &lt; 25 → bomba ON  
- si no → bomba OFF  

Calibrar con botón **A** (Lectura) y **B** (%).

---

## Si algo falla

| Problema | Qué revisar |
|----------|-------------|
| No aparece como disco USB | Orientación de la micro:bit; cable USB bien en la micro:bit |
| No enciende | Baterías / USB; micro:bit bien sentada |
| Bomba no corre | STOP→RUN; `enable On`; baterías; conector LEFT |
| Lectura rara | Cables del sensor (GND/3V/señal); calibrar SECO/MOJADO |
