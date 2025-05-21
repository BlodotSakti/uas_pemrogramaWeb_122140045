from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base

class Subject(Base):
    __tablename__ = 'subjects'
    id = Column(Integer, primary_key=True)
    kode = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    dosen = Column(String, nullable=False)
    tasks = relationship("Task", back_populates="matkul", cascade="all, delete-orphan")