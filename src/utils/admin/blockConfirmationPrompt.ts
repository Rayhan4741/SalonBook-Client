export function getBlockConfirmMessage(name: string, isBlocked: boolean): string {
  if (isBlocked) {
    return `Are you sure you wish to unblock ${name}? They will regain full salon booking privileges.`;
  }
  return `Are you sure you wish to block ${name}? Their booking privileges will be restricted immediately.`;
}
