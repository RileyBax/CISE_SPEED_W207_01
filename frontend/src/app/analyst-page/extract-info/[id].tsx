'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from '@/components/Books';

const ExtractInfoPage = () => {
  const params = useParams();
  const id = params ? params.id as string : null;
  console.log("Extracted ID from params:", id);

  const [article, setArticle] = useState<Book>(DefaultEmptyBook);
  const [extractedInfo, setExtractedInfo] = useState({
    keywords: '',
    abstract: '',
    institution: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError('ID not found in the URL.');
      setIsLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const requestURL = `${process.env.NEXT_PUBLIC_URL}api/books/${id}`;
        console.log("Fetch URL:", requestURL);

        const response = await fetch(requestURL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch article details.');
        }

        const json = await response.json();
        setArticle(json);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to fetch article details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExtractedInfo({ ...extractedInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      setError('ID not found. Unable to submit changes.');
      return;
    }

    try {
      const requestURL = `${process.env.NEXT_PUBLIC_URL}api/books/${id}`;
      console.log("Submitting updated article to:", requestURL);

      const response = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...article, ...extractedInfo, analysisCompleted: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to save extracted information.');
      }

      router.push('/analyst-page');
    } catch (err) {
      console.error('Error saving extracted information:', err);
      setError('Failed to save extracted information. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Extract Information from Article</h1>
      <button onClick={() => router.back()} className="linkButton mb-4">
        Back
      </button>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      {isLoading ? (
        <div>Loading article...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="keywords">Keywords</label>
            <input
              type="text"
              name="keywords"
              className="form-control"
              value={extractedInfo.keywords}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="abstract">Abstract</label>
            <textarea
              name="abstract"
              className="form-control"
              value={extractedInfo.abstract}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="institution">Institution/Organization</label>
            <input
              type="text"
              name="institution"
              className="form-control"
              value={extractedInfo.institution}
              onChange={handleChange}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Save Extracted Information
          </button>
        </form>
      )}
    </div>
  );
};

export default ExtractInfoPage;
