const STORAGE_KEY = 'cherish_device_id';

// Anonymous, per-browser identifier used to associate bookings & bespoke
// inquiries with this device in Supabase (no login required).
export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}
