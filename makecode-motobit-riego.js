// ============================================================
// RIEGO HUERTA — micro:bit + SparkFun moto:bit
// Para MakeCode: https://makecode.microbit.org/?lang=es
//
// PASOS:
// 1. Avanzado → Extensiones → buscar "moto-bit" → agregar
// 2. Menú ... → JavaScript → BORRAR todo → PEGAR este archivo
// 3. Volver a Bloques (ya se ven los bloques)
// 4. Descargar .hex a la micro:bit (USB en la micro:bit)
//
// CONEXIONES (energía OFF al cablear):
// Sensor banano-riego → P0: negro=GND, rojo=3V3, amarillo=señal
// Bomba → motor LEFT | Interruptor STOP al programar, RUN al probar
// micro:bit: LEDs hacia el mismo lado que chips del moto:bit
// ============================================================

let SECO = 800
let MOJADO = 300
let UMBRAL_SECO = 25
let Lectura = 0
let porcentaje = 0

// Al iniciar: bomba apagada
motobit.enable(MotorPower.Off)
basic.showIcon(IconNames.Asleep)
basic.pause(500)
basic.clearScreen()

basic.forever(function () {
    // 1) Medir humedad
    Lectura = pins.analogReadPin(AnalogPin.P0)

    // 2) Convertir a porcentaje 0–100 (calibrar SECO y MOJADO)
    porcentaje = Math.round(Math.map(Lectura, SECO, MOJADO, 0, 100))
    if (porcentaje < 0) {
        porcentaje = 0
    }
    if (porcentaje > 100) {
        porcentaje = 100
    }

    // 3) Mostrar barra de humedad en la micro:bit
    led.plotBarGraph(porcentaje, 100)

    // 4) Decidir: tierra seca → regar
    if (porcentaje < UMBRAL_SECO) {
        basic.showIcon(IconNames.Sad)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100)
        motobit.enable(MotorPower.On)
    } else {
        basic.showIcon(IconNames.Happy)
        motobit.enable(MotorPower.Off)
    }

    // 5) Esperar 2 segundos y volver a medir
    basic.pause(2000)
})

// Botón A = lectura cruda del sensor (para calibrar)
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Lectura)
})

// Botón B = porcentaje de humedad
input.onButtonPressed(Button.B, function () {
    basic.showNumber(porcentaje)
})
