# Riego automático para la huerta (micro:bit KS4021)

Misma lógica que `banano-riego`, adaptada a tu kit **Keyestudio KS4021** + Easy Plug Shield.

## Qué necesitas

| Pieza | ¿La tienes? | Notas |
|-------|-------------|--------|
| micro:bit + Easy Plug Shield | Sí (KS4021) | |
| LCD 1602 Easy Plug | Sí (kit) | Puerto **I2C** |
| Relé Easy Plug | Sí (kit) | Puerto **P12** |
| Bomba 5 V + manguera | De banano-riego | **Nunca** al pin directo |
| Fuente 5 V para la bomba | De banano-riego | Al relé (COM / NO) |
| Sensor de **humedad del suelo** | Kit KS4021 **no** lo trae | Usar el de banano-riego (adaptado) o comprar Easy Plug Soil Humidity |

El sensor de **nivel de agua** del kit **no** sustituye al de humedad del suelo en la huerta.

---

## Seguridad (para no quemar nada)

1. La bomba **solo** se alimenta con su **adaptador 5 V**, pasando por los tornillos del **relé** (COM y NO).
2. El cable RJ11 del relé solo lleva la **señal** (enciende/apaga el clic).
3. En el shield: interruptor **3V/5V → 5V**, **Power → ON**.
4. Portapilas **6 AA** en el shield (o USB en la micro:bit para programar).
5. No mojar la placa. El sensor va en la tierra; la bomba en el depósito.

---

## Conexiones

```
[micro:bit] → [Easy Plug Shield]

Sensor humedad suelo ──RJ11──→ puerto P1     (si es Easy Plug)
                              (si es el de banano-riego: ver abajo)

LCD 1602 Easy Plug ──RJ11──→ puerto I2C

Relé Easy Plug ──RJ11──→ puerto P12
   Tornillos del relé:
     COM ──→ +5 V de la fuente de la bomba
     NO  ──→ cable + de la bomba
     − de la bomba ──→ − de la fuente 5 V
```

### Si usas el sensor de banano-riego (3 cables)

No es Easy Plug. Opciones seguras:

**A (recomendada):** comprar *EASY Plug Soil Humidity Sensor* y enchufarlo a **P1**.

**B (provisional):** con el shield apagado, unir con cuidado:
- Rojo → 3V del shield / micro:bit  
- Negro → GND  
- Amarillo (señal) → pin **P1** (conector dorado o puerto que lleve P1)

Sin cortocircuitos. Si no estás seguro, usa solo la opción A.

---

## Extensión LCD en MakeCode

1. Abre https://makecode.microbit.org/?lang=es  
2. **Avanzado** → **Extensiones**  
3. Pega: `https://github.com/microbit-makecode-packages/i2cLCD1602`  
4. Añade el paquete  

Bloques típicos:
- `LcdInit 39` (39 = dirección 0x27; si no se ve, prueba 63 = 0x3F)  
- `ShowString … en x y`  
- `clear`

Si la pantalla se ve en blanco, gira el potenciómetro azul de atrás del LCD.

---

## Calibración (obligatoria en la huerta)

1. Sensor en **tierra bien seca** → anota el número (botón A o pantalla). Ese es **SECO**.  
2. Sensor en **tierra bien mojada** → anota el número. Ese es **MOJADO**.  
3. Pon esos valores en el programa (variables `SECO` y `MOJADO`).

En micro:bit la lectura es **0–1023** (no los ~26000–44600 de IdeaBoard).

---

## Lógica (igual que banano-riego)

```
para siempre:
  leer sensor → Lectura
  convertir Lectura a porcentaje 0–100 (con SECO / MOJADO)
  si % < 25  → POCA   → relé ON  (bomba riega)
  si % < 88  → NORMAL → relé OFF
  si no      → MUCHA  → relé OFF
  mostrar en LCD
  pausa 2 s
```

Pantalla 1602 (2 líneas × 16 caracteres):

```
RIEGO AUTO Banano
H:18% POCA B:ON
```

(En banano-riego la LCD era 20×4; aquí cabe en 16×2 así.)

---

## Archivos de este proyecto

- `GUIA-HUERTA-KS4021.md` — esta guía  
- `makecode-riego-huerta.js` — código para pegar en la vista **JavaScript** de MakeCode  

Después de pegar el JS, vuelve a **Bloques** para verlos y ajusta `SECO`, `MOJADO` y `PLANTA`.
