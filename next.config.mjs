import { withSentryConfig } from '@sentry/nextjs';
import withPWA from 'next-pwa';

const sentryOptions = {
  org: 'moram-moram-mr',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withSentryConfig(
  withPWA({
    dest: 'public',
  }),
  sentryOptions
);
