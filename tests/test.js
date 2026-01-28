"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Mocks
const mockHashSync = jest.fn();
const mockCompare = jest.fn();
const mockJwtSign = jest.fn();
const mockUsersCreate = jest.fn();
const mockUsersFindOne = jest.fn();
const mockPostsCreate = jest.fn();
const mockPostsIncrement = jest.fn();
const mockPostsDecrement = jest.fn();
const mockPostsDestroy = jest.fn();
const mockPostsFindAll = jest.fn();
const mockPostsFindOne = jest.fn();
const mockPostLikesCreate = jest.fn();
const mockPostLikesDestroy = jest.fn();
const mockPostLikesFindAll = jest.fn();
const mockCommentsCreate = jest.fn();
const mockCommentsIncrement = jest.fn();
const mockCommentsDecrement = jest.fn();
const mockCommentsDestroy = jest.fn();
const mockCommentsFindAll = jest.fn();
const mockCommentsFindOne = jest.fn();
const mockCommentLikesCreate = jest.fn();
const mockCommentLikesDestroy = jest.fn();
const mockCommentLikesFindAll = jest.fn();
const mockRepostCreate = jest.fn();
const mockRepostDestroy = jest.fn();
const mockRepostFindAll = jest.fn();
// 2. Mock de bcrypt
jest.mock('bcrypt', () => ({
    hashSync: mockHashSync,
    compare: mockCompare,
}));
// 3. Mock de jwt
jest.mock('jsonwebtoken', () => ({
    sign: mockJwtSign,
}));
// 4. Mock de models 
jest.mock('../models', () => ({
    users: {
        create: mockUsersCreate,
        findOne: mockUsersFindOne,
        findAll: jest.fn(),
    },
    posts: {
        create: mockPostsCreate,
        increment: mockPostsIncrement,
        decrement: mockPostsDecrement,
        destroy: mockPostsDestroy,
        findAll: mockPostsFindAll,
        findOne: mockPostsFindOne,
    },
    post_likes: {
        create: mockPostLikesCreate,
        destroy: mockPostLikesDestroy,
        findAll: mockPostLikesFindAll,
    },
    comments: {
        create: mockCommentsCreate,
        increment: mockCommentsIncrement,
        decrement: mockCommentsDecrement,
        destroy: mockCommentsDestroy,
        findAll: mockCommentsFindAll,
        findOne: mockCommentsFindOne,
    },
    comment_likes: {
        create: mockCommentLikesCreate,
        destroy: mockCommentLikesDestroy,
        findAll: mockCommentLikesFindAll,
    },
    repost: {
        create: mockRepostCreate,
        destroy: mockRepostDestroy,
        findAll: mockRepostFindAll,
    },
}));
const controllers_1 = require("../api/controllers/controllers");
// TESTS
describe('Controlador Nexus - Tests CORREGIDOS', () => {
    let req;
    let res;
    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        jest.clearAllMocks();
        mockHashSync.mockReturnValue('hashed_password_mock');
        mockJwtSign.mockReturnValue('jwt_token_mock');
    });
    // ========== TEST 1: REGISTER ==========
    describe('register_user', () => {
        test('registra usuario correctamente', async () => {
            req.body = {
                email: 'test@test.com',
                password: '123456',
                name: 'Test',
                surname: 'User',
                role: 'user'
            };
            mockUsersCreate.mockResolvedValue({});
            await (0, controllers_1.register_user)(req, res);
            expect(mockHashSync).toHaveBeenCalledWith('123456', 12);
            expect(mockUsersCreate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('maneja errores en registro', async () => {
            req.body = {
                email: 'test@test.com',
                password: '123',
                name: 'Test',
                surname: 'Error',
                role: 'user'
            };
            const error = new Error('DB Error');
            mockUsersCreate.mockRejectedValue(error);
            await (0, controllers_1.register_user)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    // ========== TEST 2: LOGIN ==========
    describe('login_user', () => {
        test('login exitoso', async () => {
            req.body = {
                email: 'test@test.com',
                password: '123456'
            };
            const mockUser = {
                id: 1,
                email: 'test@test.com',
                name: 'Test',
                password: 'hashed_password_mock',
                role: 'user'
            };
            mockUsersFindOne.mockResolvedValue(mockUser);
            mockCompare.mockResolvedValue(true);
            await (0, controllers_1.login_user)(req, res);
            expect(mockUsersFindOne).toHaveBeenCalledWith({
                where: { email: 'test@test.com' }
            });
            expect(mockCompare).toHaveBeenCalledWith('123456', 'hashed_password_mock');
            expect(res.status).toHaveBeenCalledWith(200);
        });
        test('login falla con contraseña incorrecta', async () => {
            req.body = {
                email: 'test@test.com',
                password: 'wrong'
            };
            mockUsersFindOne.mockResolvedValue({
                id: 1,
                password: 'hashed_password_mock'
            });
            mockCompare.mockResolvedValue(false);
            await (0, controllers_1.login_user)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    // ========== TEST 3: CREATE POST ==========
    describe('create_post', () => {
        test('crea post exitosamente', async () => {
            req.body = {
                content: 'Mi primer post',
                user_id: 1
            };
            mockPostsCreate.mockResolvedValue({});
            await (0, controllers_1.create_post)(req, res);
            expect(mockPostsCreate).toHaveBeenCalledWith({
                content: 'Mi primer post',
                user_id: 1,
                likes_count: 0,
                isPublic: true,
                rePost_count: 0
            });
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    // ========== TEST 4: LIKE POST ==========
    describe('like_post', () => {
        test('da like a un post', async () => {
            req.body = {
                post_id: 5,
                user_id: 3
            };
            // Configurar mocks para que resuelvan
            mockPostsIncrement.mockResolvedValue({});
            mockPostLikesCreate.mockResolvedValue({});
            await (0, controllers_1.like_post)(req, res);
            expect(mockPostsIncrement).toHaveBeenCalledWith('likes_count', {
                where: { id: 5 }
            });
            expect(mockPostLikesCreate).toHaveBeenCalledWith({
                post_id: 5,
                user_id: 3
            });
            expect(res.json).toHaveBeenCalledWith({
                message: 'User 3 liked the post 5!',
                success: true
            });
        });
    });
    // ========== TEST 5: CREATE COMMENT ==========
    describe('create_comment', () => {
        test('crea comentario exitosamente', async () => {
            req.body = {
                content: 'Excelente post!',
                user_id: 2,
                post_id: 5
            };
            mockCommentsCreate.mockResolvedValue({});
            await (0, controllers_1.create_comment)(req, res);
            expect(mockCommentsCreate).toHaveBeenCalledWith({
                content: 'Excelente post!',
                user_id: 2,
                post_id: 5,
                likes_count: 0,
            });
            expect(res.json).toHaveBeenCalledWith({
                message: 'User 2 commented a the post 5!',
                success: true
            });
        });
    });
    // ========== TEST 6: GET USER POSTS ==========
    describe('get_userPosts', () => {
        test('obtiene posts de usuario', async () => {
            req.params = { user_id: '1' };
            const mockPosts = [
                { id: 1, content: 'Post 1', user_id: 1 },
                { id: 2, content: 'Post 2', user_id: 1 },
            ];
            mockPostsFindAll.mockResolvedValue(mockPosts);
            await (0, controllers_1.get_userPosts)(req, res);
            expect(mockPostsFindAll).toHaveBeenCalledWith({
                where: { user_id: '1' }
            });
            expect(res.json).toHaveBeenCalledWith({
                posts: mockPosts,
                success: true
            });
        });
        test('muestra mensaje si no tiene posts', async () => {
            req.params = { user_id: '99' };
            mockPostsFindAll.mockResolvedValue([]);
            await (0, controllers_1.get_userPosts)(req, res);
            expect(res.json).toHaveBeenCalledWith({
                message: 'The user 99 dont have posts yet!',
                success: true,
            });
        });
    });
    // ========== TEST 7: GET ALL POSTS ==========
    describe('get_Posts', () => {
        test('obtiene todos los posts', async () => {
            const mockPosts = [
                { id: 1, content: 'Post 1', user_id: 1 },
                { id: 2, content: 'Post 2', user_id: 2 },
            ];
            mockPostsFindAll.mockResolvedValue(mockPosts);
            await (0, controllers_1.get_Posts)(req, res);
            expect(mockPostsFindAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                posts: mockPosts,
                success: true
            });
        });
        test('muestra mensaje si no hay posts', async () => {
            mockPostsFindAll.mockResolvedValue([]);
            await (0, controllers_1.get_Posts)(req, res);
            expect(res.json).toHaveBeenCalledWith({
                message: 'There are not posts in database',
                success: true,
            });
        });
    });
});
