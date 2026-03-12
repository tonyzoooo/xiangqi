import { useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, useTheme } from '@/theme'
import type { DisplayType } from '@/theme'

const DISPLAY_OPTIONS: { value: DisplayType; label: string }[] = [
  { value: 'text', label: '文字' },
  { value: 'icon', label: 'Icon' },
  { value: 'svg', label: 'SVG' },
]

export const SettingsMenu = () => {
  const [open, setOpen] = useState(false)
  const {
    displayType,
    setDisplayType,
    cellSize,
    canDecreaseSize,
    canIncreaseSize,
    decreaseSize,
    increaseSize,
  } = useTheme()

  return (
    <>
      <Pressable style={styles.iconButton} onPress={() => setOpen(true)}>
        <MaterialCommunityIcons name="cog" size={26} color="#2c3e50" />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.panel}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Settings</Text>
              <Pressable onPress={() => setOpen(false)}>
                <MaterialCommunityIcons name="close" size={22} color="#444" />
              </Pressable>
            </View>

            <Text style={styles.sectionLabel}>Piece Style</Text>
            <View style={styles.optionRow}>
              {DISPLAY_OPTIONS.map(({ value, label }) => (
                <Pressable
                  key={value}
                  style={[
                    styles.optionBtn,
                    displayType === value && styles.optionBtnActive,
                  ]}
                  onPress={() => setDisplayType(value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      displayType === value && styles.optionTextActive,
                    ]}
                    selectable={false}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Board Size</Text>
            <View style={styles.stepRow}>
              <Pressable
                style={[styles.stepBtn, !canDecreaseSize && styles.stepBtnDisabled]}
                onPress={canDecreaseSize ? decreaseSize : undefined}
              >
                <Text style={styles.stepBtnText} selectable={false}>−</Text>
              </Pressable>
              <Text style={styles.sizeValue} selectable={false}>
                {cellSize}
              </Text>
              <Pressable
                style={[styles.stepBtn, !canIncreaseSize && styles.stepBtnDisabled]}
                onPress={canIncreaseSize ? increaseSize : undefined}
              >
                <Text style={styles.stepBtnText} selectable={false}>+</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: colors.boardFill,
    borderRadius: 8,
    elevation: 2,
    padding: 12,
    pointerEvents: 'auto',
  },
  optionBtn: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1.5,
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  optionBtnActive: {
    backgroundColor: colors.boardBorder,
    borderColor: colors.boardBorder,
  },
  optionRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  optionText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#fff',
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 8,
    padding: 24,
    width: 280,
  },
  sectionLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  sizeValue: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
    minWidth: 44,
    textAlign: 'center',
  },
  stepBtn: {
    alignItems: 'center',
    backgroundColor: colors.boardFill,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  stepBtnDisabled: {
    opacity: 0.3,
  },
  stepBtnText: {
    fontSize: 22,
    fontWeight: '300',
    lineHeight: 26,
    color: '#333',
  },
  stepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    color: '#222',
    fontSize: 18,
    fontWeight: '700',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
})
