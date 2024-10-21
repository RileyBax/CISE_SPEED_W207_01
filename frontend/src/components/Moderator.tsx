// components/ModeratorLayout.tsx
import Link from 'next/link';

const ModeratorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="moderator-portal">
            <div className="sidebar">
                <h2>Moderator Tools</h2>
                <ul>
                    <li><Link href="/submission-form" className="linkButtons">Submission</Link></li>
                    <li><Link href="/verifying-book" className="linkButtons">Verified Articles</Link></li>
                    {/* <li><button className="linkButtons">Analyst</button></li>
                    <li><button className="linkButtons">Notifications</button></li> */}
                    <Link href="/" className="logoutButton">Logout</Link>
                </ul>
            </div>

            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default ModeratorLayout;