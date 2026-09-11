# Checklist rápido — huerta con KS4021

## Antes de encender
- [ ] micro:bit encajada en el shield
- [ ] LCD 1602 → **I2C**
- [ ] Relé → **P12**
- [ ] Sensor humedad suelo → **P1** (Easy Plug o adaptado)
- [ ] Shield: **5V** y **Power ON**
- [ ] Bomba cableada solo a **COM/NO** del relé + fuente **5 V**
- [ ] Extensión LCD añadida en MakeCode
- [ ] Código de `makecode-riego-huerta.js` pegado / descargado al micro:bit

## Calibrar
- [ ] Botón **A** = lectura cruda (anotar SECO / MOJADO)
- [ ] Botón **B** = porcentaje
- [ ] Ajustar `SECO` y `MOJADO` en el código
- [ ] Si el % sale al revés, intercambiar SECO y MOJADO

## Prueba sin agua primero
- [ ] Relé hace **clic** cuando el % &lt; 25 (POCA)
- [ ] LCD muestra planta, humedad y bomba ON/OFF
- [ ] Luego conectar la bomba con fuente aparte

## Presentación feria / maestra
Sistema de riego automático para huerta:
mide humedad → decide POCA/NORMAL/MUCHA → enciende bomba por relé → muestra en pantalla.
