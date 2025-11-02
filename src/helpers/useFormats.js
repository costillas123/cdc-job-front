export function formatLongDate(dateValue) {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return dateValue;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatShortDate(dateValue) {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return dateValue;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(dateValue) {
  if (!dateValue) return '';
  
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return dateValue;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function capitalizedStatus(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function dateAgo(date) {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export const isDateNew = (date) => {
   const created = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return diffDays <= 3; // New if posted within 3 days
};

export const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-warning-subtle text-warning';
    case 'withdrawn':
      return 'bg-info-subtle text-info'; 
    case 'interview':
      return 'bg-primary-subtle text-primary';
    case 'rejected':
      return 'bg-danger-subtle text-danger';
    case 'hired':
      return 'bg-success-subtle text-success';
    default:
      return 'bg-secondary-subtle text-secondary';
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return 'ri-time-line';
    case 'withdrawn':
      return 'ri-arrow-go-back-line'; 
    case 'interview':
      return 'ri-discuss-line';
    case 'rejected':
      return 'ri-close-circle-line';
    case 'hired':
      return 'ri-user-follow-line';
    default:
      return 'ri-folder-2-line';
  }
};

export const storageBaseUrl = () => {
  const baseUrl = process.env.VUE_APP_AUTHDOMAIN.replace(/\/api\/?$/, "");
  return `${baseUrl}/public/storage`; 
};

export const userTypeMap = {
  job_seeker: { icon: "ri-user-search-line", label: "Job Seeker" },
  employer: { icon: "ri-briefcase-4-fill", label: "Employer" },
  peso_school: { icon: "ri-bank-line", label: "PESO / School" },
  manpower_agency: { icon: "ri-team-fill", label: "Manpower Agency" },
  secretariat: { icon: "ri-shield-star-line", label: "CDC Secretariat" },
  admin: { icon: "ri-shield-user-fill", label: "Administrator" },
  default: { icon: "ri-group-fill", label: "All Users" },
};
