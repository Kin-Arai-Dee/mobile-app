import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from 'Routes/RootStackParam'
import {
  Avatar,
  Badge,
  Box,
  HStack,
  ScrollView,
  Stack,
  Text,
  Link,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { isEmpty } from 'lodash'
type FoodDetailProps = StackScreenProps<
  RootStackParamList,
  'FoodDetail' | 'FoodDetail2'
>

const FoodDetail: React.FC<FoodDetailProps> = ({
  route: { params },
  navigation,
}) => {
  if (!params) {
    return <Spinner visible textContent="loading..." />
  }

  const { food } = params

  useEffect(() => {
    navigation.setOptions({
      headerTitle: food.title,
    })
  }, [])
  return (
    <ScrollView>
      <Box m="4" flex="1">
        <Stack alignItems="center" space="2" textAlign="center">
          <Avatar source={{ uri: food.imageUrl }} size="280px" />
          <Text fontSize="4xl" fontWeight="medium">
            {food.title}
          </Text>
          <HStack space="1" flexWrap="wrap">
            {!isEmpty(food.ingredientTags) &&
              food.ingredientTags.map(ingredientTag => (
                <Badge
                  variant="subtle"
                  rounded="full"
                  colorScheme="cyan"
                  _text={{
                    fontSize: '14',
                  }}
                >
                  {ingredientTag.primaryName}
                </Badge>
              ))}
            {!isEmpty(food.categories) &&
              food.categories.map(categorie => (
                <Badge
                  variant="subtle"
                  rounded="full"
                  colorScheme="lime"
                  _text={{
                    fontSize: '14',
                  }}
                  mb={1}
                >
                  {categorie.primaryName}
                </Badge>
              ))}
          </HStack>
          <Text
            textAlign="center"
            fontSize="lg"
            fontWeight="medium"
            color="primary.600"
          >
            {`${food.calories} Kcal\n โดยประมาณ`}
          </Text>
          <Stack width="100%" p="4" pt="2" space="2">
            <Stack>
              <Text fontSize="md" fontWeight="semibold">
                วัตถุดิบ:
              </Text>
              <Text fontSize="md">
                {[...new Set(food.ingredients)].map(
                  (ingredient, index) =>
                    `${ingredient.ingredientName}${
                      index != food.ingredients.length - 1 ? ', ' : ''
                    }`
                )}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="md" fontWeight="semibold">
                วิธีปรุง:{' '}
              </Text>
              <Text fontSize="md" fontWeight={400}>
                {isEmpty(food.methods) ? (
                  '-'
                ) : (
                  <>
                    {food.methods.map(
                      (method, index) =>
                        `${method.primaryName.replace('เมนู', '')}${
                          index != food.methods.length - 1 ? ', ' : ''
                        }`
                    )}
                  </>
                )}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="md" fontWeight="semibold">
                ระดับความเผ็ด:
              </Text>
              <Text fontSize="md">{food.isSpicy}</Text>
            </Stack>

            <Link
              onPress={() =>
                navigation.navigate('Webview', {
                  uri: food.url,
                })
              }
            >
              ดูวิธีทำเพิ่มเติม
            </Link>
          </Stack>
        </Stack>
      </Box>
    </ScrollView>
  )
}

export default FoodDetail
