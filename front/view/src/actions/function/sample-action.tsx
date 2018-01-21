import { CHANGE_TEXT } from '../../store/define'

export function change_text(text: string) {
  return { type: CHANGE_TEXT, text: text }
}
