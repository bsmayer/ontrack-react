import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';

import { useQuery } from '../../hooks/use-query.hook';
import { api } from '../../common/api';
import { BookResponse, Book } from '../../models/book.model';
import { Pagination } from '../../components/pagination/pagination.component';
import { PaginationContainer, SearchContainer } from './home.styles';

const ITEMS_PER_PAGE = 15;

export const HomeScreen: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentTerm, setCurrentTerm] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const term = query.get('term') || '';
    const pageQueryParam = query.get('page');

    let page = 1;
    if (pageQueryParam && !isNaN(Number(pageQueryParam))) {
      page = Number(pageQueryParam);
    }

    if (page !== currentPage) {
      setCurrentPage(page);
      setCurrentTerm(term);
      search(term, page);
    }
  }, [query, currentPage]);

  async function search(term: string = '', page: number = 1) {
    try {
      setLoading(true);
      const response = await api
        .client()
        .path('books')
        .payload({
          page,
          itemsPerPage: ITEMS_PER_PAGE,
          filters: [
            {
              type: 'all',
              values: [term],
            },
          ],
        })
        .post()
        .getResponse<BookResponse>();

      setBooks(response.books);
      setTotalItems(response.count);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <SearchContainer>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={10}>
                <Form.Control
                  value={currentTerm}
                  onChange={(e) => setCurrentTerm(e.target.value)}
                  type="text"
                  placeholder="Search for anything :)"
                />
              </Col>
              <Col>
                <Button
                  disabled={loading}
                  variant="primary"
                  onClick={() => {
                    setCurrentPage(0);
                    history.push(`/?page=1&term=${currentTerm}`);
                  }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </SearchContainer>
      {totalItems === 0 && (
        <Row>
          <Col>
            <h3>Nothing was found :(</h3>
          </Col>
        </Row>
      )}
      {totalItems > 0 && (
        <>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Number of pages</th>
                  </tr>
                </thead>
                <tbody>
                  {books?.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.book_author.join(', ')}</td>
                      <td>{book.book_title}</td>
                      <td>{book.book_pages}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationContainer>
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={totalItems}
                  visiblePagesCount={7}
                />
              </PaginationContainer>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
