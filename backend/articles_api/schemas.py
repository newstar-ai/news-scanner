'''
This file defines boundaries of data parsed by api
Those schema is used by json_schema libary
'''

article_upload_schema = {
	"type": "object",
	"properties": {
		"article_info": {
			"properties": {
				"article_title": {"type": "string"},
				"article_author": {"type": "string"},
				"article_content": {"type": "string"},
				"article_url_local": {"type": "string"},
				"article_url_web": {"type": "string"},
				"words_count": {"type": "number"}
			},
			"required": ["article_title", "article_content", "article_url_local", "article_url_web", "words_count"],
			"additionalProperties": False
		},
		"publication_info": {
			"properties": {
				"publish_date": {"type": "string"},
				"page_num": {"type": "number"}
			},
			"required": ["publish_date", "page_num"],
			"additionalProperties": False
		},
		"newspaper_info": {
			"properties": {
				"newspaper_title": {"type": "string"},
			},
			"required": ["newspaper_title"],
			"additionalProperties": False
		}
	},
	"required": ["article_info", "publication_info", "newspaper_info"],
	"additionalProperties": False
}

article_update_schema = {
	"type": "object",
	"properties": {
		"title": {"type": "string"},
		"author": {"type": "string"},
		"content": {"type": "string"}
	},
	"required": ["title", "content"],
	"additionalProperties": False
}

article_search_schema = {
	"type": "object",
	"properties": {
		"keyword": {"type": "string"},
		"search_fields": {
			"properties": {
				"content": {"type": "boolean"},
				"title": {"type": "boolean"},
				"author": {"type": "boolean"}			
			},
			"required": ["content", "title", "author"]
		},
		"start_date": {"type": ["string", "null"]},
		"end_date": {"type": ["string", "null"]}
	},
	"required": ["keyword", "search_fields", "start_date", "end_date"],
	"additionalProperties": False
}