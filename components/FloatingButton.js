import React, { useRef } from "react";

import {
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";


// PEGAMOS O TAMANHO DA TELA
const { width, height } = Dimensions.get("window");


export default function FloatingButton() {

  // NAVEGAÇÃO ENTRE TELAS
  const navigation = useNavigation();


  /*
    Animated.ValueXY
    controla a posição X e Y do botão
  */
  const pan = useRef(
    new Animated.ValueXY({
      x: width - 90,
      y: height - 220,
    })
  ).current;



  /*
    PanResponder
    responsável pelo movimento de arrastar
  */
  const panResponder = useRef(

    PanResponder.create({

      // LIBERA O MOVIMENTO AO TOCAR
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      // QUANDO COMEÇA A ARRASTAR
      onPanResponderGrant: () => {

        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });

        pan.setValue({
          x: 0,
          y: 0,
        });
      },



      // MOVIMENTO DO DEDO
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),



      // QUANDO SOLTA O BOTÃO
      onPanResponderRelease: () => {

        pan.flattenOffset();

        /*
          EFEITO MAGNÉTICO NAS BORDAS
        */

        let finalX = pan.x._value;

        // SE ESTIVER MAIS À ESQUERDA
        if (finalX < width / 2) {
          finalX = 20;
        }

        // SE ESTIVER MAIS À DIREITA
        else {
          finalX = width - 90;
        }

        Animated.spring(pan, {
          toValue: {
            x: finalX,
            y: pan.y._value,
          },

          useNativeDriver: false,
        }).start();
      },
    })

  ).current;



  /*
    ABRIR TELA DE INSERÇÃO
  */
  const openInsertScreen = () => {

    navigation.navigate("DespesasScreen");

    // TROQUE PELO NOME DA SUA TELA
  };



  return (

    <Animated.View

      {...panResponder.panHandlers}

      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
          ],
        },
      ]}
    >

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openInsertScreen}
        style={styles.touch}
      >

        <Image
          source={require("../assets/floating-add.png")}
          style={styles.image}
        />

      </TouchableOpacity>

    </Animated.View>
  );
}



const styles = StyleSheet.create({

  container: {
    position: "absolute",
    zIndex: 999,
  },

  image: {
    width: 110,
    height: 110,
  },

  touch: {
  justifyContent: "center",
  alignItems: "center",
  },

});