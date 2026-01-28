from flask import Blueprint, jsonify, request
import json
import os

kb_bp = Blueprint('knowledge_base', __name__)

@kb_bp.route('/api/knowledge-base/articles', methods=['GET'])
def get_articles():
    """Get all knowledge base articles with optional filtering"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'knowledge_base.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        articles = data['articles']
        
        category = request.args.get('category')
        search = request.args.get('search')
        difficulty = request.args.get('difficulty')
        
        if category and category != 'all':
            articles = [a for a in articles if a['category'] == category]
        
        if difficulty and difficulty != 'all':
            articles = [a for a in articles if a['difficulty'] == difficulty]
        
        if search:
            search_lower = search.lower()
            articles = [a for a in articles if 
                       search_lower in a['title'].lower() or
                       search_lower in a['description'].lower() or
                       any(search_lower in tag.lower() for tag in a['tags'])]
        
        return jsonify({
            'status': 'success',
            'data': articles
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@kb_bp.route('/api/knowledge-base/article/<article_id>', methods=['GET'])
def get_article(article_id):
    """Get single article by ID"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'knowledge_base.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        article = next((a for a in data['articles'] if a['id'] == article_id), None)
        
        if article:
            return jsonify({
                'status': 'success',
                'data': article
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': 'Article not found'
            }), 404
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@kb_bp.route('/api/knowledge-base/categories', methods=['GET'])
def get_categories():
    """Get all categories"""
    try:
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'knowledge_base.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        return jsonify({
            'status': 'success',
            'data': data['categories']
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500