import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function GastosScreen() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const limpiarFormulario = () => {
    setNombre("");
    setMonto("");
    setCategoria("");
    setFecha("");
    setEditandoId(null);
  };

  const guardarGasto = () => {
    if (!nombre || !monto) return;

    if (editandoId !== null) {
      const listaActualizada = gastos.map((g) =>
        g.id === editandoId ? { ...g, nombre, monto, categoria, fecha } : g
      );
      setGastos(listaActualizada);
    } else {
      const nuevoGasto = {
        id: Date.now(),
        nombre,
        monto,
        categoria,
        fecha,
      };
      setGastos([...gastos, nuevoGasto]);
    }

    limpiarFormulario();
  };

  const guardarIngreso = () => {
    if (!nombre || !monto) return;

    const nuevoIngreso = {
      id: Date.now(),
      nombre,
      monto,
      categoria,
      fecha,
    };

    setIngresos([...ingresos, nuevoIngreso]);
    limpiarFormulario();
  };

  const eliminarGasto = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  const editarGasto = (gasto) => {
    setNombre(gasto.nombre);
    setMonto(gasto.monto);
    setCategoria(gasto.categoria);
    setFecha(gasto.fecha);
    setEditandoId(gasto.id);
  };

  const totalGastos = gastos.reduce((acc, g) => acc + parseFloat(g.monto || 0), 0);
  const totalIngresos = ingresos.reduce((acc, i) => acc + parseFloat(i.monto || 0), 0);
  const balance = totalIngresos - totalGastos;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fondoAzul} />

      <View style={styles.contenido}>
        {/* Resumen financiero */}
        <View style={styles.saldoCard}>
          <Text style={styles.saldoTitulo}>Resumen Financiero</Text>
          <Text style={styles.resumenTexto}>Ingresos: $ {totalIngresos.toFixed(2)}</Text>
          <Text style={styles.resumenTexto}>Gastos: $ {totalGastos.toFixed(2)}</Text>
          <Text
            style={[
              styles.saldoMonto,
              { color: balance >= 0 ? "green" : "red" },
            ]}
          >
            Balance: $ {balance.toFixed(2)}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formulario}>
          <Text style={styles.tituloSeccion}>Registrar Movimiento</Text>

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Pago quincenal"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#aaa"
          />

          <View style={styles.fila}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text style={styles.label}>Monto:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ej. 1200.00"
                value={monto}
                onChangeText={setMonto}
                placeholderTextColor="#aaa"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text style={styles.label}>Categoría:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Sueldo"
                value={categoria}
                onChangeText={setCategoria}
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          <Text style={styles.label}>Fecha:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={fecha}
            onChangeText={setFecha}
            placeholderTextColor="#aaa"
          />

          <View style={styles.filaBotones}>
            <TouchableOpacity style={styles.botonGasto} onPress={guardarGasto}>
              <Text style={styles.textoBoton}>Guardar Gasto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonIngreso} onPress={guardarIngreso}>
              <Text style={styles.textoBoton}>Guardar Ingreso</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de gastos */}
        <Text style={styles.tituloSeccion}>Gastos</Text>
        {gastos.map((gasto) => (
          <View key={gasto.id} style={styles.cardGasto}>
            <View>
              <Text style={styles.gastoNombre}>{gasto.nombre}</Text>
              <Text style={styles.gastoInfo}>${gasto.monto} - {gasto.categoria}</Text>
              <Text style={styles.gastoFecha}>{gasto.fecha}</Text>
            </View>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => editarGasto(gasto)} style={styles.btnEditar}>
                <Text style={styles.txtAccion}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminarGasto(gasto.id)} style={styles.btnEliminar}>
                <Text style={styles.txtAccion}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Lista de ingresos */}
        <Text style={styles.tituloSeccion}>Ingresos</Text>
        {ingresos.map((ingreso) => (
          <View key={ingreso.id} style={styles.cardGasto}>
            <View>
              <Text style={styles.gastoNombre}>{ingreso.nombre}</Text>
              <Text style={styles.gastoInfo}>${ingreso.monto} - {ingreso.categoria}</Text>
              <Text style={styles.gastoFecha}>{ingreso.fecha}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.fondoInferior} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f4f8",
    alignItems: "center",
    paddingBottom: 40,
  },
  fondoAzul: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 250,
    backgroundColor: "#002359",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  fondoInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#002359",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  contenido: {
    width: "90%",
    marginTop: 80,
  },
  saldoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 25,
    elevation: 5,
  },
  saldoTitulo: {
    fontSize: 15,
    color: "#333",
  },
  saldoMonto: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  resumenTexto: {
    fontSize: 14,
    marginTop: 5,
  },
  formulario: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  fila: {
    flexDirection: "row",
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  botonGasto: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 8,
    width: "48%",
  },
  botonIngreso: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    borderRadius: 8,
    width: "48%",
  },
  textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  cardGasto: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  gastoNombre: {
    fontSize: 15,
    fontWeight: "600",
  },
  gastoInfo: {
    fontSize: 13,
    color: "#444",
  },
  gastoFecha: {
    fontSize: 12,
    color: "#777",
  },
  acciones: {
    flexDirection: "row",
  },
  btnEditar: {
    backgroundColor: "#ffa500",
    padding: 6,
    borderRadius: 6,
    marginRight: 5,
  },
  btnEliminar: {
    backgroundColor: "#e53935",
    padding: 6,
    borderRadius: 6,
  },
  txtAccion: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});