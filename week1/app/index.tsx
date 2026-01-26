import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const styles = StyleSheet.create({
    scrollContent: {
      padding: 20,
    },
    header: {
      height: 100,
      backgroundColor: "#1A535C",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 20,
    },
    headerText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    box: {
      flex: 1,
      height: 100,
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    boxText: {
      color: "white",
      fontWeight: "600",
    },
    contentSection: {
      marginTop: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
    },
    listItem: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      borderLeftWidth: 5,
      borderLeftColor: "#1A535C",
    },
    headerFlatList: {
      padding: 20,
      backgroundColor: "#1378c0",
    },
    headerFlatListText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "blue",
      marginRight: 10,
    },
  });

  const personalData = {
    name: "ณัฐวัฒน์ จิรกุลประดิษฐ๋",
    nickName: "ฟิวส์",
    email: "66210096@dpu.ac.th",
  };

  const educationData = {
    uniName: "มหาวิทยาลัยธุรกิจบัณฑิตย์",
    department: "วิศวกรรมคอมพิวเตอร์",
    year: "ปีที่ 6",
  };

  const address = {
    houseNumber: "59/81",
    province: "นนทบุรี",
    district: "เมืองนนทบุรี",
    subDistrict: "บางเขน",
    postalCode: "11000",
  };

  const favoriteThings = [
    "การเขียนโปรแกรม",
    "การเล่นเกม",
    "การอ่านหนังสือ",
    "การเดินทาง",
  ];

  const dislikes = ["ผักใบเขียว", "สิ่งที่รู้สึกว่าไม่ make sense"];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: "#FF6B6B" }]}>
          <Text style={styles.boxText}>รหัส</Text>
          <Text style={styles.boxText}>66210096</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#4ECDC4" }]}>
          <Text style={styles.boxText}>คณะ</Text>
          <Text style={styles.boxText}>CITE</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#556270" }]}>
          <Text style={styles.boxText}>สาขา</Text>
          <Text style={styles.boxText}>CE</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว:</Text>
        <View style={styles.listItem}>
          <Text>ชื่อ: {personalData.name}</Text>
        </View>
        <View style={styles.listItem}>
          <Text>ชื่อเล่น: {personalData.nickName}</Text>
        </View>
        <View style={styles.listItem}>
          <Text>อีเมล: {personalData.email}</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
        <View style={styles.listItem}>
          <Text>ระดับอุดมศึกษา: {educationData.uniName}</Text>
        </View>
        <View style={styles.listItem}>
          <Text>
            สาขา: {educationData.department} ({educationData.year})
          </Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ที่อยู่:</Text>
        <View style={styles.listItem}>
          <Text>
            {address.houseNumber} {address.subDistrict} {address.district}{" "}
            {address.province} {address.postalCode}
          </Text>
        </View>
      </View>

      <View style={styles.headerFlatList}>
        <Text style={styles.headerFlatListText}>สิ่งที่ชอบ</Text>
      </View>
      {favoriteThings.map((thing, index) => (
        <View key={index + 1} style={styles.itemContainer}>
          <View style={styles.dot} />
          <Text>{thing}</Text>
        </View>
      ))}

      <View style={styles.headerFlatList}>
        <Text style={styles.headerFlatListText}>สิ่งที่ไม่ชอบ</Text>
      </View>
      {dislikes.map((thing, index) => (
        <View key={index + 1} style={styles.itemContainer}>
          <View style={styles.dot} />
          <Text>{thing}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
