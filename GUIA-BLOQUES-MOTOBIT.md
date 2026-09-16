# Riego por bloques — micro:bit + moto:bit (casi 11 años)

Para programar en: https://makecode.microbit.org/?lang=es

## 1. Armar (con ayuda de un adulto)

### Sensor de humedad (banano-riego) → moto:bit
En un conector de 3 pines etiquetado **P0** (o **P1**):

| Cable del sensor | En el moto:bit |
|------------------|----------------|
| Negro            | GND            |
| Rojo             | 3.3V / V       |
| Amarillo         | señal del **P0** |

Si no hay cable Dupont de 3 pines: usa **3 lagartos**.

### Bomba → moto:bit
- Los 2 cables de la bomba al conector de motor **LEFT** (o RIGHT).
- Portapilas AA en el jack del moto:bit.
- Interruptor del moto:bit en **Run Motors** cuando vayan a probar la bomba.
- Mientras programan: interruptor en la otra posición (motores apagados).

### micro:bit
Encajar la micro:bit en el moto:bit (LEDs hacia arriba).

---

## 2. Extensión en MakeCode (una sola vez por proyecto)

1. Abrir MakeCode.
2. **Avanzado** → **Extensiones**.
3. Buscar: `moto-bit` o `SparkFun moto-bit`.
4. Agregar la extensión **moto:bit**.

Aparecerá una categoría nueva con bloques de motores.

---

## 3. Variables (crear)

En **Variables** → **Crear una variable…**:

- `Lectura`
- `SECO`   (ejemplo inicial: 800)
- `MOJADO` (ejemplo inicial: 300)
- `porcentaje`

---

## 4. Bloques — **al iniciar**

1. fijar `SECO` a `800`
2. fijar `MOJADO` a `300`
3. (de la extensión moto:bit) **enable motors** → `Off`  
   *(bomba apagada al empezar)*

---

## 5. Bloques — **para siempre**

Orden:

1. fijar `Lectura` a **leer pin analógico P0**
2. fijar `porcentaje` a **mapear** `Lectura`  
   de bajo `SECO` … alto `MOJADO`  
   a bajo `0` … alto `100`
3. (opcional) si `porcentaje` &lt; `0` → fijar a `0`  
   si `porcentaje` &gt; `100` → fijar a `100`
4. **trazar gráfico de barras** de `porcentaje` hasta `100`
5. **si** `porcentaje` &lt; `25` **entonces**
   - mostrar icono triste / gota
   - **set motor Left Forward at 100 %**
   - **enable motors On**   ← bomba ON (riega)
   **si no**
   - mostrar icono feliz / check
   - **enable motors Off**  ← bomba OFF
6. **pausa (ms)** `2000`

---

## 6. Botones (para calibrar)

**al pulsar el botón A**  
→ **mostrar número** `Lectura`

**al pulsar el botón B**  
→ **mostrar número** `porcentaje`

### Cómo calibrar (importante)
1. Sensor en **tierra seca** → mira el número con **A** → ese valor va en `SECO`.
2. Sensor en **tierra mojada** → número con **A** → va en `MOJADO`.
3. Si el % sale al revés (seco da % alto), **intercambia** SECO y MOJADO.

---

## 7. Qué debe entender el niño

```
Medir → Decidir → Actuar

tierra seca (poca humedad)  → bomba ON
tierra bien                 → bomba OFF
```

Igual que banano-riego, pero con **bloques** de MakeCode y **moto:bit**.

---

## 8. Seguridad

- No mojar la placa.
- Bomba en el depósito; sensor en la tierra.
- Primero probar **sin agua** (ver si el motor/bomba responde).
- Si la bomba no gira: interruptor **Run Motors** + baterías + `enable On`.

---

## Enlaces

- MakeCode: https://makecode.microbit.org/?lang=es
- Instalar extensión: https://learn.sparkfun.com/tutorials/microbot-kit-experiment-guide/installing-the-motobit-extension-in-makecode
- Guía moto:bit: https://learn.sparkfun.com/tutorials/microbot-kit-experiment-guide/about-the-motobit-board
