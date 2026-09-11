// Riego automático huerta — micro:bit + KS4021 Easy Plug
// Pegar en MakeCode: vista JavaScript (después de añadir extensión i2cLCD1602)
//
// Conexiones:
//   Sensor humedad → P1
//   Relé (bomba)   → P12
//   LCD 1602       → I2C
//   Shield: 5V + Power ON
//
// Bomba: SOLO por relé + fuente 5 V aparte (nunca al pin directo)

let PLANTA = "Banano"
let SECO = 800
let MOJADO = 300
let UMBRAL_SECO = 25
let UMBRAL_MOJADO = 88
let Lectura = 0
let porcentaje = 0
let estado = ""
let regando = false

// LCD: 39 = 0x27 | si no funciona prueba 63 = 0x3F
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
pins.digitalWritePin(DigitalPin.P12, 0)

basic.forever(function () {
    Lectura = pins.analogReadPin(AnalogPin.P1)
    porcentaje = mapearHumedad(Lectura)
    estado = comoEsta(porcentaje)
    regando = porcentaje < UMBRAL_SECO

    if (regando) {
        pins.digitalWritePin(DigitalPin.P12, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P12, 0)
    }

    mostrarPantalla()
    led.plotBarGraph(porcentaje, 100)
    basic.pause(2000)
})

input.onButtonPressed(Button.A, function () {
    basic.showNumber(Lectura)
})

input.onButtonPressed(Button.B, function () {
    basic.showNumber(porcentaje)
})

function mapearHumedad(v: number) {
    // Si tu sensor da al revés (seco=bajo), intercambia SECO y MOJADO
    let p = Math.map(v, SECO, MOJADO, 0, 100)
    p = Math.round(p)
    if (p < 0) {
        p = 0
    }
    if (p > 100) {
        p = 100
    }
    return p
}

function comoEsta(p: number) {
    if (p < UMBRAL_SECO) {
        return "POCA"
    } else if (p < UMBRAL_MOJADO) {
        return "NORMAL"
    } else {
        return "MUCHA"
    }
}

function mostrarPantalla() {
    let bombaTxt = regando ? "ON" : "OFF"
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString(("RIEGO " + PLANTA).substr(0, 16), 0, 0)
    I2C_LCD1602.ShowString(
        ("H:" + porcentaje + "% " + estado + " B:" + bombaTxt).substr(0, 16),
        0,
        1
    )
}
