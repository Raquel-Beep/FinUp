import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function AdminScreen() {
  const [users, setUsers] = useState([
    { id: "1", name: "Luana Airosa", email: "luana@email.com", status: "Ativo" },
    { id: "2", name: "João Silva", email: "joao@email.com", status: "Inativo" },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: "1", plan: "Premium Mensal", status: "Ativa", expire: "20/06/2026" },
    { id: "2", plan: "Básico", status: "Cancelada", expire: "10/02/2026" },
  ]);

  const chartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        data: [2000, 3500, 2800, 4000, 4200, 5000],
        strokeWidth: 3,
      },
    ],
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleDeleteSub = (id) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>Dashboard </Text>

      {/* KPI CARDS */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiTitle}>Usuários</Text>
          <Text style={styles.kpiValue}>{users.length}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiTitle}>Receita</Text>
          <Text style={styles.kpiValue}>R$ 5.000</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiTitle}>Assinaturas</Text>
          <Text style={styles.kpiValue}>{subscriptions.length}</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiTitle}>Crescimento</Text>
          <Text style={styles.kpiValue}>+12%</Text>
        </View>
      </View>

      {/* CHART */}
      <Text style={styles.sectionTitle}>Receita x Despesas</Text>

      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1a1a2e",
          backgroundGradientTo: "#16213e",
          color: (opacity = 1) => `rgba(155, 89, 182, ${opacity})`,
          labelColor: () => "#fff",
        }}
        style={styles.chart}
      />

      {/* USERS */}
      <Text style={styles.sectionTitle}>Gerenciar Usuários</Text>

      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <Text style={styles.cardTitle}>{user.name}</Text>
          <Text style={styles.cardText}>{user.email}</Text>
          <Text style={styles.status}>{user.status}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDeleteUser(user.id)}
            >
              <Text style={styles.btnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* SUBSCRIPTIONS */}
      <Text style={styles.sectionTitle}>Assinaturas</Text>

      {subscriptions.map((sub) => (
        <View key={sub.id} style={styles.card}>
          <Text style={styles.cardTitle}>{sub.plan}</Text>
          <Text style={styles.cardText}>Vence: {sub.expire}</Text>
          <Text style={styles.status}>{sub.status}</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDeleteSub(sub.id)}
            >
              <Text style={styles.btnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* PDF EXPORT */}
      <Text style={styles.sectionTitle}>Exportar Relatórios</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.pdfBtn}>
          <Text style={styles.btnText}>PDF Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pdfBtn}>
          <Text style={styles.btnText}>PDF Assinaturas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.pdfBtnFull}>
        <Text style={styles.btnText}>PDF Completo</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f1a",
    padding: 10,
  },

  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 10,
  },

  sectionTitle: {
    color: "#bbb",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  kpiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  kpiCard: {
    width: "48%",
    backgroundColor: "#1a1a2e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  kpiTitle: {
    color: "#aaa",
    fontSize: 12,
  },

  kpiValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  chart: {
    borderRadius: 10,
  },

  card: {
    backgroundColor: "#1a1a2e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cardText: {
    color: "#aaa",
  },

  status: {
    color: "#9b59b6",
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  editBtn: {
    backgroundColor: "#6c5ce7",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },

  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },

  pdfBtn: {
    backgroundColor: "#2d3436",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    margin: 5,
  },

  pdfBtnFull: {
    backgroundColor: "#6c5ce7",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});