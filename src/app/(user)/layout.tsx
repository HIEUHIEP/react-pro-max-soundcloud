
import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Title Layout',
    description: 'description Layout',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader />
            {children}
            <div style={{ marginBottom: "100px" }}></div>
            <AppFooter />
        </>
    );
}
