import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createScore: Score;
  deleteScore: Scalars['String'];
  updateScore?: Maybe<Score>;
};


export type MutationCreateScoreArgs = {
  input: ScoreInput;
};


export type MutationDeleteScoreArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateScoreArgs = {
  id: Scalars['Int'];
  input: ScoreInput;
};

export type PaginatedScores = {
  __typename?: 'PaginatedScores';
  hasMore: Scalars['Boolean'];
  scores: Array<Score>;
};

export type Query = {
  __typename?: 'Query';
  score?: Maybe<Score>;
  scores: PaginatedScores;
};


export type QueryScoreArgs = {
  id: Scalars['Int'];
};


export type QueryScoresArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Score = {
  __typename?: 'Score';
  createdAt: Scalars['String'];
  duration_asleep: Scalars['String'];
  duration_in_bed: Scalars['String'];
  id: Scalars['Float'];
  score: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ScoreInput = {
  duration_asleep: Scalars['String'];
  duration_in_bed: Scalars['String'];
  score: Scalars['String'];
};

export type DeleteScoreMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteScoreMutation = { __typename?: 'Mutation', deleteScore: string };

export type CreateScoreMutationVariables = Exact<{
  input: ScoreInput;
}>;


export type CreateScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'Score', id: number, duration_asleep: string, duration_in_bed: string, score: string, createdAt: string, updatedAt: string } };

export type UpdateScoreMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ScoreInput;
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore?: { __typename?: 'Score', id: number, duration_asleep: string, duration_in_bed: string, score: string, createdAt: string, updatedAt: string } | null };

export type ScoreQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ScoreQuery = { __typename?: 'Query', score?: { __typename?: 'Score', id: number, duration_asleep: string, duration_in_bed: string, score: string, createdAt: string, updatedAt: string } | null };

export type ScoresQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ScoresQuery = { __typename?: 'Query', scores: { __typename?: 'PaginatedScores', hasMore: boolean, scores: Array<{ __typename?: 'Score', id: number, duration_asleep: string, duration_in_bed: string, score: string, createdAt: string, updatedAt: string }> } };


export const DeleteScoreDocument = gql`
    mutation DeleteScore($id: Int!) {
  deleteScore(id: $id)
}
    `;
export type DeleteScoreMutationFn = Apollo.MutationFunction<DeleteScoreMutation, DeleteScoreMutationVariables>;

/**
 * __useDeleteScoreMutation__
 *
 * To run a mutation, you first call `useDeleteScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScoreMutation, { data, loading, error }] = useDeleteScoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteScoreMutation(baseOptions?: Apollo.MutationHookOptions<DeleteScoreMutation, DeleteScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteScoreMutation, DeleteScoreMutationVariables>(DeleteScoreDocument, options);
      }
export type DeleteScoreMutationHookResult = ReturnType<typeof useDeleteScoreMutation>;
export type DeleteScoreMutationResult = Apollo.MutationResult<DeleteScoreMutation>;
export type DeleteScoreMutationOptions = Apollo.BaseMutationOptions<DeleteScoreMutation, DeleteScoreMutationVariables>;
export const CreateScoreDocument = gql`
    mutation CreateScore($input: ScoreInput!) {
  createScore(input: $input) {
    id
    duration_asleep
    duration_in_bed
    score
    createdAt
    updatedAt
  }
}
    `;
export type CreateScoreMutationFn = Apollo.MutationFunction<CreateScoreMutation, CreateScoreMutationVariables>;

/**
 * __useCreateScoreMutation__
 *
 * To run a mutation, you first call `useCreateScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScoreMutation, { data, loading, error }] = useCreateScoreMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScoreMutation(baseOptions?: Apollo.MutationHookOptions<CreateScoreMutation, CreateScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateScoreMutation, CreateScoreMutationVariables>(CreateScoreDocument, options);
      }
export type CreateScoreMutationHookResult = ReturnType<typeof useCreateScoreMutation>;
export type CreateScoreMutationResult = Apollo.MutationResult<CreateScoreMutation>;
export type CreateScoreMutationOptions = Apollo.BaseMutationOptions<CreateScoreMutation, CreateScoreMutationVariables>;
export const UpdateScoreDocument = gql`
    mutation UpdateScore($id: Int!, $input: ScoreInput!) {
  updateScore(id: $id, input: $input) {
    id
    duration_asleep
    duration_in_bed
    score
    createdAt
    updatedAt
  }
}
    `;
export type UpdateScoreMutationFn = Apollo.MutationFunction<UpdateScoreMutation, UpdateScoreMutationVariables>;

/**
 * __useUpdateScoreMutation__
 *
 * To run a mutation, you first call `useUpdateScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScoreMutation, { data, loading, error }] = useUpdateScoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateScoreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScoreMutation, UpdateScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateScoreMutation, UpdateScoreMutationVariables>(UpdateScoreDocument, options);
      }
export type UpdateScoreMutationHookResult = ReturnType<typeof useUpdateScoreMutation>;
export type UpdateScoreMutationResult = Apollo.MutationResult<UpdateScoreMutation>;
export type UpdateScoreMutationOptions = Apollo.BaseMutationOptions<UpdateScoreMutation, UpdateScoreMutationVariables>;
export const ScoreDocument = gql`
    query Score($id: Int!) {
  score(id: $id) {
    id
    duration_asleep
    duration_in_bed
    score
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useScoreQuery__
 *
 * To run a query within a React component, call `useScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScoreQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useScoreQuery(baseOptions: Apollo.QueryHookOptions<ScoreQuery, ScoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScoreQuery, ScoreQueryVariables>(ScoreDocument, options);
      }
export function useScoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScoreQuery, ScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScoreQuery, ScoreQueryVariables>(ScoreDocument, options);
        }
export type ScoreQueryHookResult = ReturnType<typeof useScoreQuery>;
export type ScoreLazyQueryHookResult = ReturnType<typeof useScoreLazyQuery>;
export type ScoreQueryResult = Apollo.QueryResult<ScoreQuery, ScoreQueryVariables>;
export const ScoresDocument = gql`
    query Scores($limit: Int!, $cursor: String) {
  scores(limit: $limit, cursor: $cursor) {
    scores {
      id
      duration_asleep
      duration_in_bed
      score
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __useScoresQuery__
 *
 * To run a query within a React component, call `useScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScoresQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useScoresQuery(baseOptions: Apollo.QueryHookOptions<ScoresQuery, ScoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScoresQuery, ScoresQueryVariables>(ScoresDocument, options);
      }
export function useScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScoresQuery, ScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScoresQuery, ScoresQueryVariables>(ScoresDocument, options);
        }
export type ScoresQueryHookResult = ReturnType<typeof useScoresQuery>;
export type ScoresLazyQueryHookResult = ReturnType<typeof useScoresLazyQuery>;
export type ScoresQueryResult = Apollo.QueryResult<ScoresQuery, ScoresQueryVariables>;