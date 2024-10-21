'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/components/Books';
import Link from 'next/link';

const AnalystPage = () => {
  const [articles, setArticles] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch all articles that are verified but still need detailed analysis
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/books`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        const approvedArticles = data.filter((book: Book) => book.verified && !book.analysisCompleted);
        setArticles(approvedArticles);
      } catch (err) {
        console.error('Error fetching articles for analysis:', err);
        setError('Failed to fetch articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleExtractInfo = (articleId: string) => {
    console.log("Navigating to Extract Info with ID:", articleId);
    router.push(`/analyst-page/extract-info/${articleId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Analyst Dashboard</h1>
      <Link href="/" className="linkButton mb-4">
        Return to Home
      </Link>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      {isLoading ? (
        <div>Loading articles...</div>
      ) : (
        <div>
          {articles.length === 0 ? (
            <p>No articles available for analysis.</p>
          ) : (
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article._id} className="border p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p>Author(s): {article.authors}</p>
                  <p>Journal: {article.journalName}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleExtractInfo(article._id!)}
                  >
                    Extract Information
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalystPage;
