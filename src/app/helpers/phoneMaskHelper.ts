export function MaskPhoneInput(value: string, mask: string) {
  const strippedMask: string = mask.replace(/[^9a*]/g, '');
  value = value.replace(/[^a-zA-Z\d]/g, '');
  if (value.length > strippedMask.length) value = value.slice(0, strippedMask.length);

  const splitValue: string[] = value.split('');

  const splitMask: string[] = mask.split('');

  let i = 0;
  let j = 0;
  let maskedValue = "";
  while (i < value.length) {
    const nextMaskChar = splitMask[j];
    if (/[^9a*]/.test(nextMaskChar)) {
      maskedValue += nextMaskChar;
      j++;
      continue;
    }

    let nextValueChar = splitValue[i];
    switch (nextMaskChar) {
      case '9':
        nextValueChar = nextValueChar.replace(/\D/g, '');
        break;
      case 'a':
        nextValueChar = nextValueChar.replace(/[^a-zA-Z]/g, '');
        break;
      case '*':
        nextValueChar = nextValueChar.replace(/[^a-zA-Z\d]/g, '');
        break;
    }
    maskedValue += nextValueChar;
    i++;
    j++;
  }

  return maskedValue;
}
