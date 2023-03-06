import { NativeBaseProvider } from 'native-base'
import React, { ReactNode } from 'react'
import { nativeTheme } from '../../themes/NativeBase'

export interface NativeBaseProviderWithThemeProps {
  children: ReactNode
}

const NativeBaseProviderWithTheme = ({
  children,
}: NativeBaseProviderWithThemeProps) => {
  return <NativeBaseProvider theme={nativeTheme}>{children}</NativeBaseProvider>
}

export default NativeBaseProviderWithTheme
