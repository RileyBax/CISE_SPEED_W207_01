// pages/submission-form.tsx
'use client';

import SubmissionForm from '@/components/SubmissionForm';
import Moderator from '@/components/Moderator'; // Ensure it's ModeratorLayout

export default function SubmissionPage() {
    return (
        <Moderator>
            <SubmissionForm />
        </Moderator>
    );
}